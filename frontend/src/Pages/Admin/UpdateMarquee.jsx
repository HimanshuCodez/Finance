import React, { useState, useEffect } from "react";
import { db } from "../../firebase"; // Adjust path as needed
import { doc, getDoc, setDoc } from "firebase/firestore";

const UpdateMarquee = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMarqueeText = async () => {
      const docRef = doc(db, "settings", "marquee");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setText(docSnap.data().text_content || "Welcome to World of SMR FINSERV IMF");
      } else {
        setText("Welcome to World of SMR FINSERV IMF"); // Initial text if document doesn't exist
      }
      setLoading(false);
    };

    fetchMarqueeText();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const docRef = doc(db, "settings", "marquee");
      await setDoc(docRef, { text_content: text }, { merge: true });
      setMessage("Marquee text updated successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
      setMessage("Error updating marquee text. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading current marquee text...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Update Marquee Text</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
        className="w-full p-2 border rounded"
        placeholder="Enter marquee text here"
      />
      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        {saving ? "Saving..." : "Save Text"}
      </button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default UpdateMarquee;
