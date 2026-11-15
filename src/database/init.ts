
import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";

const dbPath = path.resolve(__dirname, "../../database.db");
const schemaPath = path.resolve(__dirname, "schema.sql");

export function initializeDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    const schema = fs.readFileSync(schemaPath, "utf-8");

    const db = new sqlite3.Database(dbPath, (openError) => {
      if (openError) {
        reject(openError);
        return;
      }

      db.exec(schema, (schemaError) => {
        if (schemaError) {
          db.close(() => reject(schemaError));
          return;
        }

        console.log("Banco inicializado com sucesso em", dbPath);

        db.close((closeError) => {
          if (closeError) {
            reject(closeError);
          } else {
            resolve();
          }
        });
      });
    });
  });
}
