import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { db } from "../../firebase"; // Adjust path as needed
import { doc, getDoc } from "firebase/firestore";

const Swiper = () => {
  const [marqueeText, setMarqueeText] = useState("Loading marquee text...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarqueeText = async () => {
      try {
        const docRef = doc(db, "settings", "marquee");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setMarqueeText(docSnap.data().text_content || "Default marquee text if Firebase field is empty.");
        } else {
          setMarqueeText("No marquee text found in Firebase. Please add a 'text_content' field to 'settings/marquee'.");
        }
      } catch (err) {
        console.error("Error fetching marquee text:", err);
        setError("Failed to load marquee text.");
        setMarqueeText("Error loading text. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMarqueeText();
  }, []);

  if (loading) {
    return (
      <Marquee className="font-bold">
        Loading...
      </Marquee>
    );
  }

  if (error) {
    return (
      <Marquee className="font-bold text-red-500">
        Error: {marqueeText}
      </Marquee>
    );
  }

  return (
    <Marquee className="font-bold">
      {marqueeText}
    </Marquee>
  );
};

export default Swiper;