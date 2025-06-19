import prisma from "../prisma";

export async function getAllSkills() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { nama: "asc" },
    });
    return skills;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}
