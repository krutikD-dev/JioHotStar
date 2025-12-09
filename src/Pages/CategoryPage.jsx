import "./CategoryPage.css";
import CategorySection from "./CategorySection";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";

const BROWSE = [
  { title: "TV", type: "browse", value: "tv" },
  { title: "Movies", type: "browse", value: "movie" },
];

const LANGUAGES = [
  { title: "Hindi", type: "language", value: "hi" },
  { title: "English", type: "language", value: "en" },
  { title: "Tamil", type: "language", value: "ta" },
  { title: "Telugu", type: "language", value: "te" },
  { title: "Bengali", type: "language", value: "bn" },
];

export default function CategoryPage() {
  const [loading, setLoading] =useState(false)
  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
        setLoading(false)
  ,300})
  },[])

    if (loading) return <div style={{width:'100%',minHeight:'100vh', display:'flex', justifyContent:'center',alignItems:'center' }}><span className="loader"></span></div>;

  return (
    <div className="category-page">
      <CategorySection title="Browse" items={BROWSE} />
      <CategorySection title="Popular Languages" items={LANGUAGES} />
      <Footer />
    </div>
  );
}
