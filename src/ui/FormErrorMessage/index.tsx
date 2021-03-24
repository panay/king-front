import React from "react";
import {ReactComponent as IcWarning} from "infrastructure/assets/images/svgs/ic-warning.svg";

function FormErrorMessage ({message}: {message: string}) {
    return (<div className="w-full bg-warning text-white px-4 py-3 flex items-center rounded-xl">
        <IcWarning className="mr-4" />
        {message}
    </div>);
}

export default FormErrorMessage;
