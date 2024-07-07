'use client';
import './Filter.css';
import './Filter-Animations.css';
import { categorysList } from '@/lib/static-data';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function FilterOption ({ category, subCategory }: {
    category: string,
    subCategory: string[]
}) {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const updateSearchParams = (param: "name" | "category" | "type", value: string) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));

        if (current.has(param) && current.get(param) === value) {
            current.delete(param);
        } else {
            current.set(param, value);
        };

        const search = current.toString();

        const query = search? `?${search}` : "";
        router.push(`${pathName}${query}`);
    };

    return(
        <div className="filter__option">
            <input className="filter__option__category" type="checkbox"
             id={`filter-category${category}`} 
             onClick={()=>{updateSearchParams("category", category)}} />
            <label htmlFor={`filter-category${category}`} className="filter__option__label">
                <h3 className="filter__option__category__title">{category}</h3>
                <div className="filter__option__category__icon"></div>
            </label>
            <ul className="filter__option__list">
              {subCategory.map((element, i)=>(
                  <li key={i} className="filter__option__list__element"
                  onClick={()=>{updateSearchParams("type", element)}}>
                      <div className="dot"></div>    
                      {element}
                  </li>
              ))}
            </ul>
        </div>
    );
};

export default function Filter () {
    
    return(
        <section className="filter">
            <h3 className="filter__title">Filtrar</h3>
            {categorysList.map((element, i)=>(
                <FilterOption category={element.name} subCategory={element.types} 
                key={i}/>
            ))}
        </section>
    );
};