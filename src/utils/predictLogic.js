import { similarBranches } from "./branchMap";
import { fetchAIPrediction } from "./aiFallback";

function extractCity(collegeName) {
  const knownCities = [
    "Mumbai", "Pune", "Nagpur", "Nashik", "Amravati", "Aurangabad", "Solapur",
    "Latur", "Yavatmal", "Kolhapur", "Satara", "Sangli", "Dhule", "Nanded",
    "Thane", "Jalgaon", "Parbhani", "Akola", "Beed", "Osmanabad", "Ratnagiri"
  ];
  const cityFromComma = collegeName.match(/,\\s*([^,]+)$/);
  if (cityFromComma) return cityFromComma[1].trim();

  const match = knownCities.find(city =>
    collegeName.toLowerCase().includes(city.toLowerCase())
  );
  return match || "Unknown";
}

function mapToCoreCategory(category) {
  const cat = category.toUpperCase();
  if (cat.includes("OPEN")) return "OPEN";
  if (cat === "EWS") return "EWS";
  if (cat.includes("SEBC")) return "SEBC";
  if (cat.includes("OBC")) return "OBC";
  if (cat.includes("SC")) return "SC";
  if (cat.includes("ST")) return "ST";
  if (cat.includes("NT1")) return "NT1";
  if (cat.includes("NT2")) return "NT2";
  if (cat.includes("NT3")) return "NT3";
  if (cat.includes("DEF")) return "DEFENCE";
  if (cat.includes("PWD")) return "PWD";
  if (cat.includes("ORPHAN")) return "ORPHAN";
  return "OTHER";
}

function rateCollegeQuality(collegeName) {
  const topColleges = ["IIT", "COEP", "VJTI", "ICT", "Walchand", "PCCOE", "Pune Institute of Computer Technology", "SPIT", "Cummins", "Vishwakarma Institute of Technology", "MIT", "KJ Somaiya", "Sardar Patel", "Fr. Conceicao Rodrigues", "Shivaji University", "Government College of Engineering"];
  const name = collegeName.toLowerCase();
  if (topColleges.some(c => name.includes(c.toLowerCase()))) return 3;
  if (name.includes("government")) return 2;
  if (name.includes("institute") || name.includes("engineering")) return 1;
  return 0.5;
}

function isFemaleCategory(code) {
  return /F$|FS/.test(code.toUpperCase());
}

function isGirlsCollegeOnly(collegeName) {
  const girlsOnlyColleges = ["Cummins", "SNDT", "MKSSS", "K.B.P. College for Women"];
  return girlsOnlyColleges.some(name =>
    collegeName.toLowerCase().includes(name.toLowerCase())
  );
}

export function predictColleges({ percentile, category, branch, city, gender }, rounds) {
  const userCore = category.toUpperCase();
  let result = {};

  Object.keys(rounds).forEach((round) => {
    const entries = rounds[round]
      .filter((entry) => {
        const entryCore = mapToCoreCategory(entry.category);
        const isFemale = gender === "Female";
        const isGenderNeutral = gender === "Gender Neutral";

        const isCategoryMatch =
          (entryCore === userCore || entryCore === "OPEN") &&
          (isFemale || !isFemaleCategory(entry.category));

        const isBranchMatch = branch
          ? entry.branch.toLowerCase().includes(branch.toLowerCase())
          : true;

        const isCityMatch = city
          ? entry.college.toLowerCase().includes(city.toLowerCase())
          : true;

        const qualifies = parseFloat(percentile) >= parseFloat(entry.cutoff);
        const isAllowedCollege = !(isGenderNeutral && isGirlsCollegeOnly(entry.college));

        return isCategoryMatch && isBranchMatch && isCityMatch && qualifies && isAllowedCollege;
      })
      .map((entry) => {
        const gap = percentile - entry.cutoff;
        let chanceLabel;
        if (gap >= 3) chanceLabel = "High Chance ✅";
        else if (gap >= 0.5) chanceLabel = "Medium Chance ⚠️";
        else if (gap >= 0) chanceLabel = "Low Chance ❌";
        else return null;

        return {
          ...entry,
          city: extractCity(entry.college),
          coreCategory: mapToCoreCategory(entry.category),
          chance: chanceLabel,
          score: 100 - Math.abs(gap),
          quality: rateCollegeQuality(entry.college)
        };
      })
      .filter(Boolean)
      .reduce((acc, current) => {
        const key = `${current.college}-${current.branch}-${current.coreCategory}`;
        if (!acc.map.has(key)) {
          acc.map.set(key, current);
          acc.list.push(current);
        }
        return acc;
      }, { map: new Map(), list: [] }).list
      .sort((a, b) => {
        if (b.quality !== a.quality) return b.quality - a.quality;
        return b.score - a.score;
      });

    result[round] = entries;
  });

 

  

  return result;
}

