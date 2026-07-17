import { FaRandom } from "react-icons/fa";

import Button from "../common/Button";

export default function GenerateButton({

    loading,

    onGenerate,

}) {

    return (

        <div className="my-10 flex justify-center">

            <Button
                onClick={onGenerate}
                disabled={loading}
                className="px-8 py-4 text-lg"
            >

                <FaRandom />

                {loading
                    ? "Generating..."
                    : "Generate Balanced Teams"}

            </Button>

        </div>

    );

}