'use client';
import './Filter.css';
import './Filter-Animations.css';
import { categorysList } from '@/lib/static-data';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function FilterOption ({ category, subCategory, currentCategory, setCurrentCategory }: {
    category: string,
    subCategory: string[],
    currentCategory: string | null,
    setCurrentCategory: (category: string | null) => void
}) {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const [ isChecked, setIsChecked ] =  useState(currentCategory === category);

    useEffect(()=>{
        if (!(searchParams.has("category") || searchParams.has("type"))) {
            setIsChecked(false);
        };
    }, [searchParams, pathName])

    const updateSearchParams = (param: "name" | "category" | "type", value: string, isCategory: boolean) => {
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
        } else {
            if (current.has(param) && current.get(param) === value) {
                current.delete(param);
            } else {
                current.set(param, value);
            }
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
                onChange={()=>{updateSearchParams("category", category, true)}} />
            <label htmlFor={`filter-category${category}`} className="filter__option__label">
                <h3 className="filter__option__category__title">{category}</h3>
                <div className="filter__option__category__icon"></div>
            </label>
            <ul className="filter__option__list">
                {subCategory.map((element, i) => (
                    <li key={i} className="filter__option__list__element"
                        onClick={()=>{updateSearchParams("type", element, false)}}>
                        <div className="dot"></div>    
                        {element}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Filter () {
    const [currentCategory, setCurrentCategory] = useState<string | null>(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has("category")) {
            setCurrentCategory(searchParams.get("category"));
        }
    }, []);

    return(
        <section className="filter">
            <h3 className="filter__title">Filtrar</h3>
            {categorysList.map((element, i) => (
                <FilterOption category={element.name} subCategory={element.types} 
                    key={i} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}/>
            ))}
        </section>
    );
}
