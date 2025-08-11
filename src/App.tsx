import "./App.css";
// import { Chem2DIMG } from "@";
import "@/utils";
// import { KetcherEdit } from "@/ketcher-edit";
import { KetcherStandaloneEdit } from "@/ketcher-standalone-edit";
import { useKetcherEditHook } from "@/hook";
const mol = `Benzene
   Ketcher  8152413542D 1   1.00000     0.00000     0

 12 13  0  0  0  0  0  0  0  0999 V2000
    7.3848   -1.7751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.1152   -1.7746    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    8.2516   -1.2750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.1152   -2.7755    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    7.3848   -2.7800    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    8.2538   -3.2750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.9812   -3.2755    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   11.7115   -3.2739    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   10.8476   -2.7748    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   11.7121   -4.2748    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.9819   -4.2805    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   10.8512   -4.7749    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
  3  1  2  0     0  0
  1  5  1  0     0  0
  5  6  2  0     0  0
  6  4  1  0     0  0
  4  2  2  0     0  0
  2  3  1  0     0  0
  4  7  1  0     0  0
  9  7  2  0     0  0
  7 11  1  0     0  0
 11 12  2  0     0  0
 12 10  1  0     0  0
 10  8  2  0     0  0
  8  9  1  0     0  0
M  END`;
function App() {
	const { KetcherRef } = useKetcherEditHook();
	// 	const mol = `Benzene
	//    Ketcher  8152413542D 1   1.00000     0.00000     0
	//
	//  12 13  0  0  0  0  0  0  0  0999 V2000
	//     7.3848   -1.7751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
	//     9.1152   -1.7746    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
	//     8.2516   -1.2750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
	//     9.1152   -2.7755    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
	//     7.3848   -2.7800    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
	//     8.2538   -3.2750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
	//     9.9812   -3.2755    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
	//    11.7115   -3.2739    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
	//    10.8476   -2.7748    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
	//    11.7121   -4.2748    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
	//     9.9819   -4.2805    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
	//    10.8512   -4.7749    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
	//   3  1  2  0     0  0
	//   1  5  1  0     0  0
	//   5  6  2  0     0  0
	//   6  4  1  0     0  0
	//   4  2  2  0     0  0
	//   2  3  1  0     0  0
	//   4  7  1  0     0  0
	//   9  7  2  0     0  0
	//   7 11  1  0     0  0
	//  11 12  2  0     0  0
	//  12 10  1  0     0  0
	//  10  8  2  0     0  0
	//   8  9  1  0     0  0
	// M  END`;
	// const { KetcherRef } = useKetcherEditHook();
	// const highlight = {
	// 	atoms: [1, 2, 3],
	// 	bonds: [4, 5, 6]
	// };
	const handleClick = () => {
		if (KetcherRef.current) {
			// KetcherRef.current.getSmiles().then(smiles => {
			// 	console.log(smiles);
			// });

			KetcherRef.current.setMoleculeRender(mol);
		}
	};
	return (
		<div>
			{/*<Chem2DIMG mol={mol} previewButton={{ placement: "bottomRight" }} highlight={highlight}></Chem2DIMG>*/}

			<div style={{ width: "1000px", height: "600px" }}>
				<KetcherStandaloneEdit
					ref={KetcherRef}
					staticResourcesUrl={"./"}
					buttons={{
						fullscreen: {
							hidden: true
						},
						settings: {
							hidden: true
						}
					}}
				/>
				<button onClick={handleClick}>按钮</button>
			</div>
		</div>
	);
}

export default App;
