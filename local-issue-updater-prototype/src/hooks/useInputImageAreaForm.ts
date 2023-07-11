import React, { useState } from 'react'

const useInputImageAreaForm = () => {
    const [areaImages, setAreaImages] = useState<Record<string, File[]>>({});
    const handleAreaImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        area: string
    ) => {
        if (e.target.files && e.target.files.length > 0) {
            const newImages = Array.from(e.target.files);
            setAreaImages((prevImages) => ({
                ...prevImages,
                [area]: [...(prevImages[area] || []), ...newImages],
            }));
        }
    };

    const handleDeleteAreaImage = (area: string, index: number) => {
        setAreaImages((prevImages) => {
            const updatedImages = [...(prevImages[area] || [])];
            updatedImages.splice(index, 1);
            return { ...prevImages, [area]: updatedImages };
        });
    };
  return {
    areaImages,
    handleAreaImageChange,
    handleDeleteAreaImage,
  }
}

export default useInputImageAreaForm