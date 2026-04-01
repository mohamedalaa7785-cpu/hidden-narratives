import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function seedEpisodes() {
  const migrationData = JSON.parse(fs.readFileSync(path.join(__dirname, 'migration-data.json'), 'utf8'));

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'hidden_narratives',
  });

  try {
    for (const episode of migrationData) {
      const query = `
        INSERT INTO episodes (
          slug, titleEn, titleAr, descriptionEn, descriptionAr,
          contentEn, contentAr, keywordsEn, keywordsAr, category,
          publishedAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          titleEn = VALUES(titleEn),
          titleAr = VALUES(titleAr),
          descriptionEn = VALUES(descriptionEn),
          descriptionAr = VALUES(descriptionAr),
          contentEn = VALUES(contentEn),
          contentAr = VALUES(contentAr),
          keywordsEn = VALUES(keywordsEn),
          keywordsAr = VALUES(keywordsAr),
          updatedAt = NOW()
      `;

      await connection.execute(query, [
        episode.slug,
        episode.titleEn,
        episode.titleAr,
        episode.descriptionEn,
        episode.descriptionAr,
        episode.contentEn,
        episode.contentAr,
        episode.keywordsEn,
        episode.keywordsAr,
        episode.category,
        new Date(),
        new Date(),
      ]);

      console.log(`✓ Seeded: ${episode.slug}`);
    }

    console.log(`\n✓ Successfully seeded ${migrationData.length} episodes`);
  } catch (error) {
    console.error('Error seeding episodes:', error);
  } finally {
    await connection.end();
  }
}

seedEpisodes();
