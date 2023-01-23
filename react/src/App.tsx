import "./App.scss";
import "luna-park";
import { LunaParkEditor } from "./components/editor/LunaParkEditor";
import { LunaParkLauncher } from "./components/launcher/LunaParkLauncher";

function App() {
    return (
        <div className="app">
            <lp-theme primary="#ffff00" tint="#101000"/>
            <div className="wrapper">
                <h1>Luna Park editor - Demo</h1>
                <LunaParkEditor/>
                <LunaParkLauncher/>
            </div>
        </div>
    );
}

export default App;
