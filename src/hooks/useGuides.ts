'use client';
import { useState, useEffect } from "react";
import guidesData from "../../data/guides.json";

export function useGuides() {
    const [guides, setGuides] = useState(guidesData);

    //load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('guides');
        if(stored) {
            setGuides(JSON.parse(stored));
        }
    },[]);

    //save to localStorage
    useEffect(() => {
        localStorage.setItem('guides', JSON.stringify(guides));
    },[guides]);

    const addGuide = (newGuide: any) => {
        const id = `gd-${Date.now()}`;
        const guideWithId = { ...newGuide, id};
        setGuides([...guides, guideWithId]);
    };

    return { guides, addGuide};
}
