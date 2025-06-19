import prisma from "@/lib/prisma";

async function main() {
  const skillData = [
    // Hard skills
    { slug: "nextjs", nama: "Next.js" },
    { slug: "react", nama: "React" },
    { slug: "laravel", nama: "Laravel" },
    { slug: "php", nama: "PHP" },
    { slug: "javascript", nama: "JavaScript" },
    { slug: "typescript", nama: "TypeScript" },
    { slug: "nodejs", nama: "Node.js" },
    { slug: "python", nama: "Python" },
    { slug: "java", nama: "Java" },
    { slug: "flutter", nama: "Flutter" },
    { slug: "dart", nama: "Dart" },
    { slug: "kotlin", nama: "Kotlin" },
    { slug: "sql", nama: "SQL" },
    { slug: "mongodb", nama: "MongoDB" },
    { slug: "docker", nama: "Docker" },
    { slug: "kubernetes", nama: "Kubernetes" },
    { slug: "figma", nama: "Figma" },
    { slug: "photoshop", nama: "Adobe Photoshop" },
    { slug: "illustrator", nama: "Adobe Illustrator" },
    { slug: "aws", nama: "Amazon Web Services (AWS)" },
    { slug: "gcp", nama: "Google Cloud Platform (GCP)" },
    { slug: "azure", nama: "Microsoft Azure" },

    // Soft skills
    { slug: "communication", nama: "Communication" },
    { slug: "teamwork", nama: "Teamwork" },
    { slug: "problem-solving", nama: "Problem Solving" },
    { slug: "adaptability", nama: "Adaptability" },
    { slug: "leadership", nama: "Leadership" },
    { slug: "time-management", nama: "Time Management" },
    { slug: "critical-thinking", nama: "Critical Thinking" },
    { slug: "creativity", nama: "Creativity" },
    { slug: "collaboration", nama: "Collaboration" },
    { slug: "attention-to-detail", nama: "Attention to Detail" },
  ];

  for (const skill of skillData) {
    await prisma.skill.create({
      data: skill,
    });
  }

  console.log("Seed skill selesai.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
