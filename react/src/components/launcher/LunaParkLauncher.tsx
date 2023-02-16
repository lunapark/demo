import React, { ChangeEventHandler, useReducer, useState } from "react";
import "./LunaParkLauncher.scss";
import { getCaller, loadLogic, saveLogic } from "../../lib";

export function LunaParkLauncher() {
    const [inputA, setInputA] = useState(5);
    const handleInputA: ChangeEventHandler<HTMLInputElement> = (e) => setInputA(e.target?.valueAsNumber);

    const [inputB, setInputB] = useState("Hello World");
    const handleInputB: ChangeEventHandler<HTMLInputElement> = (e) => setInputB(e.target?.value);

    const callerInput = { in_A: inputA, in_B: inputB };
    const [callerOutput, setOutput] = useState<unknown>();

    const caller = getCaller();

    async function triggerLogic() {
        setOutput(await caller({ in_A: inputA, in_B: inputB }));
    }

    return (
        <div className="luna-park-launcher">
            <div className="inputs">
                <div>Input A : <input type="number" value={inputA} onChange={handleInputA}/></div>
                <div>Input B : <input type="text" value={inputB} onChange={handleInputB}/></div>

                <div className="button-wrapper">
                    <button onClick={triggerLogic}>Launch</button>
                    <button onClick={saveLogic}>Save<span className="description">(local storage)</span></button>
                    <button onClick={loadLogic}>Load<span className="description">(local storage)</span></button>
                </div>
            </div>
            <div className="inputs_pre">
                Inputs:
                <pre>{JSON.stringify(callerInput, null, 2)}</pre>
            </div>
            <div className="inputs_pre">
                Outputs:
                <pre>{JSON.stringify(callerOutput, null, 2)}</pre>
            </div>
        </div>
    );
}
