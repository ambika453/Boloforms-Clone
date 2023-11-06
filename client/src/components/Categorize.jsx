import React, { useEffect, useState } from 'react'
import { cancel, grip } from '../assets'

const Categorize = ({ qi, q, updateForm }) => {
    const [categorize, setCategorize] = useState(q.category)
    const [icategories, setIcategories] = useState([''])

    useEffect(()=>{
        const updatedCategorize = {...categorize}
    },[])

    const handleDescription = (e) => {
        setCategorize({...categorize, description: e.target.value })
    }

    const handleCategoryInput = (e) => {
        const id = e.target.getAttribute('id')
        const updatedCategorize = {...categorize}
        updatedCategorize.categories[id] = e.target.value
        setIcategories(updatedCategorize.categories)
        setCategorize(updatedCategorize)
    }

    const handleCategoryEnter = (e) => {
        if(e.key == 'Enter'){
            setCategorize({...categorize, categories:[...categorize.categories, '']})
        }
    }

    const handleCategoryCancel = (e) => {
        const id = e.target.getAttribute('id')
        const updatedCategorize = {...categorize}
        updatedCategorize.categories.splice(id,1)
        setIcategories(updatedCategorize.categories)
        setCategorize(updatedCategorize)
    }

    const handleItemsInput = (e) => {
        const id = e.target.getAttribute('id')
        const updatedCategorize = {...categorize}
        updatedCategorize.options[id] = {...updatedCategorize.options[id], option:e.target.value}
        setCategorize(updatedCategorize)
    }

    const handleItemsEnter = (e) => {
        if(e.key == 'Enter'){
            setCategorize({...categorize, options:[...categorize.options, {option:'', category:''}]})
        }
    }

    const handleItemsCancel = (e) => {
        console.log("clicked")
        const id = e.target.getAttribute('id')
        const updatedCategorize = {...categorize}
        updatedCategorize.options.splice(id,1)
        setCategorize(updatedCategorize)
    }

    const handleItemcatChange = (e) => {
        const id = e.target.getAttribute('id')
        const updatedCategorize = {...categorize}
        updatedCategorize.options[id] = {...updatedCategorize.options[id], category:e.target.value}
        setCategorize(updatedCategorize)
    }

    useEffect(()=>{
        updateForm(qi,categorize)
    },[categorize])

   console.log(q)

    return (
        <div className='flex flex-col w-full pl-4 pb-3 pt-2'>
            <div className='w-full pb-2 pr-10'>
                <input type='text' value={categorize.description} onChange={handleDescription} placeholder='Description' className='w-full border border-[#33333366] px-2 py-1 rounded-sm text-xs focus:outline-0 focus:shadow'/>
            </div>
            <div className='flex flex-col w-2/4 justify-center items-start mt-3'>
                <div className='pb-2'>Categories</div>
                <ul>
                    {categorize.categories && categorize.categories.map((k,ki)=>(
                        <li className='flex flex-row w-full items-center justify-center mt-2' key={ki}>
                            <img src={grip} className='w-4 h-4 mr-1'/>
                            <input type='text' value={k} id={ki} placeholder={`Category ${ki+1}`} onChange={handleCategoryInput} onKeyDown={handleCategoryEnter}className='border border-[#33333366] rounded-sm px-2 py-1 text-xs focus:outline-0 focus:shadow'/>
                            <img src={cancel} id={ki} onClick={handleCategoryCancel} className={`ml-3 cursor-pointer ${ki==0 && 'opacity-0'}`}/>
                        </li>
                    ))}  
                </ul>
            </div>
            <div className='flex flex-col w-full justify-center py-3 mt-2'>
                <div className='flex flex-row w-full'>
                    <div className='flex flex-col w-full'>
                        <div className='pb-2'>Item</div>
                        <ul>
                            {categorize.options && categorize.options.map((k,ki)=>( 
                                <li className='flex flex-row w-full items-center justify-center mt-2' key={ki}>
                                    <div className='flex flex-row items-center w-full'>
                                        <img src={grip} className='w-4 h-4 mr-1'/>
                                        <input value={k.option} type='text' id={ki} placeholder={`Item ${ki+1}`} onChange={handleItemsInput} onKeyDown={handleItemsEnter} className='border border-[#33333366] rounded-sm px-2 text-xs py-1 focus:outline-0 focus:shadow'/>
                                        <img src={cancel} id={ki} onClick={handleItemsCancel} className={`ml-3 cursor-pointer ${ki==0 && 'opacity-0'}`}/>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex flex-col w-full pl-12'>
                        <div className='pb-2'>Belongs To</div>
                        <ul>
                            { categorize.options && categorize.options.map((k,ki)=>(    
                                <li className='flex w-full items-center mt-2' key={ki}>
                                    <select id={ki} value={k.category} onChange={handleItemcatChange} className='w-3/5 text-xs p-1 focus:outline-0 rounded-sm border border-[#33333366] shadow'>
                                        <option value={'Choose Category'}>Choose Category</option>
                                        {categorize.categories.map(k=>(
                                            <option>{k}</option>
                                        ))}
                                    </select>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categorize