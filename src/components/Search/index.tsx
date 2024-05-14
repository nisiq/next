import {
    MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import {
    Input,
} from "@material-tailwind/react";

export default function Search() {
    return (
        <div className="w-auto">

            <div className="w-[80%] md:w-72">
                <Input
                    label="Search"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />} crossOrigin={undefined} />
            </div>
        </div>

    )
}