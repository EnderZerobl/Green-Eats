'use client';
import './Filter.css';
import './Filter-Animations.css';
import { categorysList, characteristics } from '@/lib/static-data';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HigherData, ResponseFromApi } from '@/lib/types';

function FilterOption ({ category, subCategory, currentCategory, setCurrentCategory, componentParam, len }: {
    category: string;
    subCategory: string[];
    currentCategory: string | null;
    setCurrentCategory: (category: string | null) => void;
    componentParam: "category" | "characteristic";
    len?: number;
}) {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const [ isChecked, setIsChecked ] =  useState((currentCategory === category));

    useEffect(()=>{
        if ((!(searchParams.has("category") || searchParams.has("type"))) && componentParam !== "characteristic") {
            setIsChecked(false);
        };
    }, [searchParams, pathName, componentParam])

    const updateSearchParams = (param: "name" | "category" | "type" | "characteristic" | "", value: string, isCategory: boolean) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));

        if (isCategory) {
            if (current.has(param) && current.get(param) === value) {
                current.delete(param);
                current.delete("type"); // Remove type query when category is unchecked
                setCurrentCategory(null);
            } else {
                current.set(param, value);
                setCurrentCategory(value);
                setIsChecked(true)
            }
        } else if (param) {
            if (current.has(param) && current.get(param) === value) {
                current.delete(param);
            } else {
                current.set(param, value);
            }
        } else {
            if (isChecked && current.has("characteristic")){
                current.delete("characteristic")
            }
            setIsChecked(!isChecked)
        }

        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`${pathName}${query}`);
    };

    return(
        <div className="filter__option">
            <input className="filter__option__category" type="checkbox"
                id={`filter-category${category}`} 
                checked={isChecked}
                onChange={()=>{updateSearchParams(componentParam === "characteristic"? "" : "category", category, componentParam !== "characteristic")}} />
            <label htmlFor={`filter-category${category}`} className="filter__option__label">
                <h3 className="filter__option__category__title">{category}{componentParam==="category" ? (" ("+len+")") : ""}</h3>
                <div className="filter__option__category__icon"></div>
            </label>
            <ul className="filter__option__list">
                {subCategory.map((element, i) => (
                    <li key={i} className="filter__option__list__element"
                        onClick={()=>{updateSearchParams(componentParam === "characteristic"? "characteristic" : "type", element, false)}}>
                        <div className="dot"></div>    
                        {element}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Filter ({ higherData }: {
    higherData: HigherData
}) {
    const [currentCategory, setCurrentCategory] = useState<string | null>(null);
    const [currentCharacteristic, setCurrentCharacteristic] = useState<string | null>(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has("category")) {
            setCurrentCategory(searchParams.get("category"));
        }
        if (searchParams.has("characteristic")) {
            setCurrentCharacteristic(searchParams.get("characteristic"));
        }
    }, []);

    return(
        <section className="filter">
            <h3 className="filter__title">Filtrar</h3>
            {categorysList.map((element, i) => (
                <FilterOption category={element.name} subCategory={element.types} 
                    key={i} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}
                    len={higherData[element.name as ("Green Horta" | "Green Mercearia" | "Bebidas e Laticinios" | "Ovos e Carnes")].length} componentParam='category'/>
            ))}
            <FilterOption category='Características' subCategory={characteristics}
            key={"características"} currentCategory={currentCharacteristic} setCurrentCategory={setCurrentCharacteristic} componentParam={"characteristic"}/>
        </section>
    );
}
