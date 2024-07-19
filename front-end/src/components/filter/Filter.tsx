'use client';
import './Filter.css';
import './Filter-Animations.css';
import { categorysList, characteristics, characteristicsToWrite, order } from '@/lib/static-data';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HigherData, ResponseFromApi } from '@/lib/types';

function FilterOption ({ category, subCategory, currentCategory, setCurrentCategory, componentParam, len, lengths }: {
    category: string;
    subCategory: string[];
    currentCategory: string | null;
    setCurrentCategory: (category: string | null) => void;
    componentParam: "category" | "characteristic" | "order";
    len?: number;
    lengths?: number[];
}) {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const [ isChecked, setIsChecked ] =  useState(Boolean(currentCategory));

    useEffect(()=>{
        if (componentParam === "category" 
            && searchParams.get(componentParam) !== category
         ) {
            setIsChecked(false);
        } else if (componentParam !== "category"
            && !searchParams.has(componentParam)
         ) {
            setIsChecked(false)
        } else {
            setIsChecked(true)
        };
    }, [searchParams, componentParam, category])

    const updateSearchParams = (param: "name" | "category" | "type" | "characteristic" | "order" | "", value: string, isCategory: boolean) => {
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
            if (isChecked && current.has(componentParam)){
                current.delete(componentParam);
            }
            setIsChecked(!isChecked);
        };

        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`${pathName}${query}`);
    };

    return(
        <div className="filter__option">
            <input className="filter__option__category" type="checkbox"
                id={`filter-category${category}`} 
                checked={isChecked}
                onChange={()=>{updateSearchParams((componentParam !== "category")? "" : "category",
                category, 
                componentParam === "category")}} 
            />

            <label htmlFor={`filter-category${category}`} className="filter__option__label">
                <h3 className="filter__option__category__title">{category}{componentParam==="category" ? (" ("+len+")") : ""}</h3>
                <div className="filter__option__category__icon"></div>
            </label>
            <ul className="filter__option__list">
                {subCategory.map((element, i) => (
                    <li key={i} className="filter__option__list__element"
                        onClick={()=>{updateSearchParams(componentParam === "category"?
                            "type"
                            :componentParam,
                        element, 
                        false)}}>
                        <div className="dot"></div>    
                        {
                            componentParam === "characteristic"?
                            characteristicsToWrite[i]
                            :element
                        }
                        {(componentParam==="category" && lengths !== undefined) ? (" (" + lengths[i] +")") : ""}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Filter ({ higherData, close }: {
    higherData: HigherData;
    close: ()=>void
}) {
    const [ currentCategory, setCurrentCategory ] = useState<string | null>(null);
    const [ currentCharacteristic, setCurrentCharacteristic ] = useState<string | null>(null);
    const [ currentOrder, setCurrentOrder ] = useState<string | null>(null);
    
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has("category")) {
            setCurrentCategory(searchParams.get("category"));
        }
        if (searchParams.has("characteristic")) {
            setCurrentCharacteristic(searchParams.get("characteristic"));
        }
        if (searchParams.has("order")) {
            setCurrentOrder(searchParams.get("order"))
        }
    }, []);

    return(
        <>
        <button className="filter-outside" onClick={()=>{close()}}></button>
        <section className="filter">
            <h3 className="filter__title">Filtrar</h3>
            <select onChange={e=>{
                const current = new URLSearchParams(Array.from(searchParams.entries()));
                if (e.target.value !== 'false') {
                    current.set("exclusive", e.target.value);
                } else{
                    if (current.has("exclusive")) current.delete("exclusive");
                };
                const search = current.toString();
                const query = search ? `?${search}` : "";
                router.push(`${pathName}${query}`);
            }} className='filter__title__select' 
            name="exclusive" id="exclusive"
            defaultValue={searchParams.has("exclusive").toString()}>
                <option className='filter__title__select__option' value="false">Todos os Produtos</option>
                <option className='filter__title__select__option' value="true">Exclusivo Green Eats</option>
                <option className='filter__title__select__option' value="promo">Promoções</option>
            </select>
            {categorysList.map((element, i) => (
                <FilterOption category={element.name} subCategory={element.types} 
                    key={i} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}
                    len={higherData[element.name as ("Green Horta" | "Green Mercearia" | "Bebidas e Laticinios" | "Ovos e Carnes")].length} 
                    componentParam='category' 
                    lengths={element.types
                        .map(elem=>{
                            return higherData[element.name as ("Green Horta" | "Green Mercearia" | "Bebidas e Laticinios" | "Ovos e Carnes")]
                            .filter(response=>response.tipo===elem).length
                        })}
                    />
            ))}

            <FilterOption category='Características' subCategory={characteristics}
            key={"características"} currentCategory={currentCharacteristic} 
            setCurrentCategory={setCurrentCharacteristic} componentParam={"characteristic"}/>

            <FilterOption category={"Ordenar"} subCategory={order}
            key={"Ordenar"} currentCategory={currentOrder}
            setCurrentCategory={setCurrentOrder} componentParam={"order"} />
        </section>
        </>
    );
}
