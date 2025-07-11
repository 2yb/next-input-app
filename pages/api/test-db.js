import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db("nextinput");

      // Test connection by listing collections
      const collections = await db.listCollections().toArray();

      // Count documents in submissions collection
      const collection = db.collection("submissions");
      const count = await collection.countDocuments();

      res.status(200).json({
        message: "Database connection successful!",
        collections: collections.map((col) => col.name),
        submissionsCount: count,
      });
    } catch (err) {
      console.error("Database connection error:", err);
      res.status(500).json({
        message: "Database connection failed",
        error: err.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
