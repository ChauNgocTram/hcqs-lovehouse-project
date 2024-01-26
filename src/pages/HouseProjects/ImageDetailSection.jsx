import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getProjectDetail } from "../../constants/apiHouseProject";

export default function ImageDetailSection() {
    const { id } = useParams();
    const [houseProjectDetail, setHouseProjectDetail] = useState({});
    const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4]);
  
    useEffect(() => {
      const fetchHouseProjectDetail = async () => {
        try {
          const data = await getProjectDetail(id);
          if (data && data.result) {
            setHouseProjectDetail(data.result.data);
          } else {
            console.error("Invalid data format:", data);
          }
        } catch (error) {
          console.error("Error fetching house roof data:", error);
        }
      };
  
      fetchHouseProjectDetail();
    }, [id]);
  
    if (!houseProjectDetail || !houseProjectDetail.staticFiles) {
      return null;
    }
  
 
  
    const handleNext = () => {
      setPositionIndexes((prevIndexes) =>
        prevIndexes.map((prevIndex) => (prevIndex + 1) % 5)
      );
    };
  
    const handleBack = () => {
      setPositionIndexes((prevIndexes) =>
        prevIndexes.map((prevIndex) => (prevIndex + 4) % 5)
      );
    };
  
    const positions = ["center", "left1", "left", "right", "right1"];
  
    const imageVariants = {
      center: { x: "0%", scale: 1, zIndex: 5 },
      left1: { x: "-50%", scale: 0.7, zIndex: 4 },
      left: { x: "-90%", scale: 0.5, zIndex: 1 },
      right: { x: "90%", scale: 0.5, zIndex: 1 },
      right1: { x: "50%", scale: 0.7, zIndex: 4 },
    };
  return (
    <div className="flex items-center flex-col justify-center  h-screen relative">
        {houseProjectDetail.staticFiles.map((image, index) => (
          <motion.img
            key={image.id}
            src={image.url}
            alt={houseProjectDetail.sampleProject.id}
            className="rounded-[12px]"
            initial="center"
            animate={positions[positionIndexes[index]]}
            variants={imageVariants}
            transition={{ duration: 0.5 }}
            style={{ width: "70%", position: "absolute" }}
          />
        ))}
        <div className="flex flex-row gap-3 mt-96">
          <button
            className="text-black mt-[400px] bg-indigo-400 rounded-md py-2 px-4"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            className="text-black mt-[400px] bg-indigo-400 rounded-md py-2 px-4"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
  )
}

