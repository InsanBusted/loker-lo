import prisma from "@/lib/prisma";


async function main() {
  const bidangData = [
    { slug: "mobile-development", nama: "Mobile Development" },
    { slug: "data-science", nama: "Data Science" },
    { slug: "machine-learning", nama: "Machine Learning" },
    { slug: "cloud-computing", nama: "Cloud Computing" },
    { slug: "cyber-security", nama: "Cyber Security" },
    { slug: "devops", nama: "DevOps" },
    { slug: "game-development", nama: "Game Development" },
    { slug: "ui-ux-design", nama: "UI/UX Design" },
    { slug: "digital-marketing", nama: "Digital Marketing" },
    { slug: "network-engineering", nama: "Network Engineering" },
    { slug: "software-testing", nama: "Software Testing" },
    { slug: "database-administration", nama: "Database Administration" },
    { slug: "artificial-intelligence", nama: "Artificial Intelligence" },
    { slug: "embedded-systems", nama: "Embedded Systems" },
    { slug: "blockchain", nama: "Blockchain" },
    { slug: "iot", nama: "Internet of Things (IoT)" },
    { slug: "project-management", nama: "Project Management" },
    { slug: "technical-writing", nama: "Technical Writing" },
  ];

  for (const bidang of bidangData) {
    await prisma.bidang.upsert({
      where: { slug: bidang.slug },
      update: {},
      create: bidang,
    });
  }

  console.log("Seed bidang selesai.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
