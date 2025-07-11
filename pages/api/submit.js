import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    try {
      const client = await clientPromise;
      const db = client.db("nextinput"); // database name
      const collection = db.collection("submissions");

      await collection.insertOne({ name, createdAt: new Date() });

      res
        .status(200)
        .json({ message: `Hello, ${name}! Your input was saved.` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
