'use client'

import React, { forwardRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Button, Input } from "@material-tailwind/react";
import ButtonIcon from "../ButtonIcon";
import { PlusIcon } from "@heroicons/react/24/outline";

export interface InputTagsProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	myChange: (value: string[]) => void;
	// ClassName to add your own styles
	className?: string;
	buttonColor: string;
}


function addTags(listTags: string[], value:string, MaxTags:number, setTags:(newValue: string[]) => void, myChange:(newValue: string[]) => void, setValue:(newValue: string) => void){
	if (listTags.length < MaxTags && value.trim() !== "") {
		setTags([...listTags, value.trim()]);
		myChange([...listTags, value.trim()]);
		setValue("");
	}
}


function removeTags(index: number, listTags: string[], setTags:(newValue: string[]) => void, myChange:(newValue: string[]) => void){
	const updatedTags = listTags.filter((_, i) => i !== index);
			setTags(updatedTags);
			myChange(updatedTags);
}


const InputTagBrook = forwardRef<HTMLInputElement, InputTagsProps>(
	(props) => {
		const { myChange, ...inputProps } = props;
		const [value, setValue] = useState("");
		const [tags, setTags] = useState<string[]>([]);
		const MaxTags = 5;
		const isMaxTagsReached = tags.length >= MaxTags;


		return (
			<div className="w-full">
				<div className="w-full flex flex-row gap-3 max-w-md">
					<input
						{...inputProps}
						placeholder="Search your tags..."
						maxLength={10}
						value={value}
						type="text"
						className={`border border-palette-line bg-gray-50 text-gray-900 text-sm rounded w-full focus:border-none ${
							isMaxTagsReached ? "border-b-[1px] border-red-500" : ""
						  }`}
						onChange={(e) => setValue(e.target.value)}
					/>
                    <Button className={`bg-${inputProps.buttonColor}`} onClick={()=>{addTags(tags, value, MaxTags, setTags, myChange, setValue)}}>
						<PlusIcon className="h-4 w-4 text-white"/>
					</Button>
				</div>
				<div className="flex flex-wrap w-full mt-4 gap-2 items-center">
					{tags.map((tag, index) => (
						<span key={index} className="p-1 rounded flex flex-row items-center gap-5 truncate hover:bg-[#FFF] bg-[#FFF] border text-[#505050]">
							<p className="truncate">{tag}</p>
							<IoMdClose onClick={() => removeTags(index, tags, setTags, myChange)} />
						</span>
					))}
				</div>
			</div>
		)
	}
)

export { InputTagBrook };