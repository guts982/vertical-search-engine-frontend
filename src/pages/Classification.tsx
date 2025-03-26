import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useManageClassifications } from "@/lib/mutations";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetModelResults } from "@/lib/queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { config } from "@/app-config";
import { Delete, Trash2 } from "lucide-react";


const Classification = () => {

    const [text, setText] = useState("")
    const [resultCategory, setResultCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const { classifyText } = useManageClassifications()
    const { data: modelResults, isLoading: mrIsLoading, } = useGetModelResults();

    const handleClassifyText = () => {
        if (!Boolean(text)) return;
        setLoading(true);
        classifyText.mutate({ text }, {
            onSuccess: (data: any) => {
                toast.success("Text classified successfully.")
                console.log(data)
                setResultCategory(data.data.category);
            },
            onError: (err: any) => {
                console.log("TEXT CLASSIFICATION ERROR:", err)
                toast.error("Text classification fail.")
            }, onSettled: () => {
                setLoading(false);
            }
        })
    }

    const isBest = (mod: any, vec: any) => {

        if (modelResults) {
            const bestModel = modelResults.data.best_model;
            return mod == bestModel.model && vec == bestModel.vectorizer;
        } else {
            return false;
        }

    }

    const clearResults = () => {
        setText("")
        setResultCategory("")
    }

    useEffect(() => {
        console.log("MODEL RESULT", modelResults)
    }, [modelResults])

    useEffect(() => {
        console.log("RESULT", resultCategory)
    }, [resultCategory])

    return (
        <div className='w-full min-h-[80vh] flex justify-start items-start font-fira gap-2 p-4  '>

            <Tabs defaultValue="classification" className=" w-full flex items-center justify-center ">
                <TabsList className="w-full">
                    <TabsTrigger value="classification" className="cursor-pointer">Classification</TabsTrigger>
                    <TabsTrigger value="models" className="cursor-pointer">Model Selection</TabsTrigger>
                </TabsList>
                <TabsContent value="classification" className="pt-5 h-full">
                {/* max-w-[1000px] */}
                    <div className={` w-full flex flex-col items-center min-h-[80vh] ${(loading || resultCategory) ? "justify-start" : "justify-center"}`}>
                        <div className="grid w-full gap-2">
                        {/* min-w-[180px] lg:min-w-[450px] xl:min-w-[600px] 2xl:min-w-[800px]  */}
                            <Textarea placeholder="Type your document text here." name="text" value={text}
                                onChange={e => setText(e.target.value)}
                                className="w-full min-w-[90vw] min-h-[150px] "  >{text}</Textarea>
                            <Button disabled={loading} onClick={handleClassifyText} type="button" className="cursor-pointer">
                                Classify Text
                            </Button>
                        </div>
                        {
                            loading && <div>
                                <Skeleton className="rounded-md w-full h-[150px]" />
                            </div>
                        }
                        {
                            resultCategory &&
                            <div className=" my-5 w-full relatice ">
                             
                              <div className="text-xs text-gray-400">RESULT</div>
                                <div className="w-full flex justify-center items-center">
                                    <div className={`w-full flex justify-center items-start gap-1 rounded-md `} >
                                        <img src={`/${resultCategory}.webp`} alt="" className="h-[60px] w-[60px]  sm:h-[200px] sm:w-[200px]  xl:h-[250px] xl:w-[250px]  2xl:h-[300px] 2xl:w-[300px]  rounded-md rounded-r-none" />
                                        <div className="w-full  flex justify-start flex-col items-start                             ">
                                            <div className="rounded-md rounded-l-none h-[60px]   sm:h-[200px]   xl:h-[250px]   2xl:h-[300px]  w-full 
                                        flex justify-center items-center text-xl lg:text-2xl 2xl:text-4xl  font-bold uppercase text-white
                                        "
                                                style={{ backgroundColor: catColor(resultCategory) }}>
                                                {resultCategory}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full justify-end items-center mt-2">
                              <Button variant={"destructive"} className="cursor-pointer flex justify-center items-center" 
                              onClick={clearResults} type="button"
                              >
                                <Trash2 />
                                Clear Results</Button>
                              </div>
                               
                            </div>

                        }
                    </div>
                </TabsContent>
                <TabsContent value="models" className="w-full lg:p-4">
                
                    {
                        mrIsLoading && <div>Loading...</div>
                    }
                       {/* {modelResults &&  <div className="text-lg bg-lime-500 rounded-md my-2 p-4 text-white font-semibold text-center">
                     
                        <span className="text-white">BEST MODEL:</span>
                        <span className=" font-bold text-orange-700">
                            { ` ${modelResults.data.best_model.model.replace("_"," ").toUpperCase()} (${modelResults.data.best_model.vectorizer.toUpperCase()}) ` } </span>
                        </div>} */}
                    {
                        modelResults?.data?.model_performance && (
                            <div className="mt-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
                                {
                                    Object.entries(modelResults.data?.model_performance).map(([key, values]: any) => {
                                        const parsedKey = parseModelKey(key);
                                        return (
                                            <Card key={key} className="w-full  border-b border-gray-300 p-2 ">
                                                <CardHeader className={`bg-zinc-200 rounded-xl  py-2  ${isBest(parsedKey.model.replace(" ", "_"), parsedKey.vectorizer)  ? "bg-lime-500 text-white" : "" }`}>
                                                    <CardTitle
                                                        className={`rounded-md p-0`}
                                                    ><span className="font-bold text-lg m-0">{parsedKey.model.toUpperCase()}</span> ({parsedKey.vectorizer.toUpperCase()})</CardTitle>
                                                    <CardDescription className={`w-full flex justify-center sm:justify-between items-center text-xs p-0 m-0 ${isBest(parsedKey.model.replace(" ", "_"), parsedKey.vectorizer)  ? " text-white" : "" } `}>
                                                        <div className="flex justify-center items-center gap-2">
                                                            <div>MODEL: <span className="font-semibold">{parsedKey.model.toUpperCase()}</span></div>
                                                            <div>VECTORIZER: <span className="font-semibold">{parsedKey.vectorizer.toUpperCase()}</span></div>
                                                            {
                                                                isBest(parsedKey.model.replace(" ", "_"), parsedKey.vectorizer) && (
                                                                    <div className="font-bold text-orange-500" >BEST MODEL</div>
                                                                )
                                                            }
                                                        </div>

                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                                                        <div className="flex flex-col justify-between items-center">
                                                            <div className="text-xs flex w-full justify-between items-center "><div>ACCURACY</div> <div className="font-semibold text-blue-500">{per(values.accuracy).toFixed(2)} %</div></div>
                                                            <Progress value={per(values.accuracy)} max={100} />
                                                        </div>
                                                        <div className="flex flex-col justify-between items-center">
                                                            <div className="text-xs flex w-full justify-between items-center "><div>PRECISION</div> <div className="font-semibold text-blue-500">{per(values.precision).toFixed(2)} %</div></div>
                                                            <Progress value={per(values.precision)} max={100} />
                                                        </div>
                                                        <div className="flex flex-col justify-between items-center">
                                                            <div className="text-xs flex w-full justify-between items-center "><div>RECALL</div> <div className="font-semibold text-blue-500">{per(values.recall).toFixed(2)} %</div></div>
                                                            <Progress value={per(values.recall)} max={100} />
                                                        </div>
                                                        <div className="flex flex-col justify-between items-center">
                                                            <div className="text-xs flex w-full justify-between items-center "><div>F1 SCORE</div> <div className="font-semibold text-orange-500">{per(values.f1_score).toFixed(2)} %</div></div>
                                                            <Progress value={per(values.f1_score)} max={100} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <img src={`${config.BACKEND_API_URL}/api/confusion-matrix/${parsedKey.vectorizer}/${(parsedKey.model).replace(" ", "_")}`}
                                                            alt={`confusion-matrix-${parsedKey.vectorizer}-${parsedKey.model.replace(" ", "_")}`}
                                                            className="  rounded-md "
                                                        />
                                                    </div>

                                                </CardContent>

                                            </Card>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </TabsContent>
            </Tabs>




        </div>
    );
};

const per = (dec: any) => {
    return (parseFloat(dec) * 100);
}

function parseModelKey(input: string): { vectorizer: string, model: string } {
    const cleanedInput = input.replace(/[()']/g, '');
    const [vectorizer, model] = cleanedInput.split(',').map(item => item.trim());
    return { vectorizer, model: model.replace("_", " ") };
}


const catColor = (category: string) => {
    switch (category) {
        case "health":
            return "#4CAF50"

        case "politics":
            return "#1E3A5F"

        case "business":
            return "#1976D2"
    }
}

export default Classification;


// const ModelPerformanceCard = () => {
//   const { data: modelResults, isLoading: mrIsLoading } = useGetModelResults();

//   // Function to format model key
//   const formatModelKey = (key:any) => {
//     const [vectorizer, model] = JSON.parse(key);
//     return `${vectorizer.toUpperCase()} - ${model.replace('_', ' ').toUpperCase()}`;
//   };

//   // Function to determine border color for best model
//   const getBorderStyle = (key:any, bestModel:any) => {
//     const [vectorizer, model] = JSON.parse(key);
//     return bestModel.vectorizer === vectorizer && bestModel.model === model
//       ? "border-4 border-green-500 bg-green-50"
//       : "border";
//   };

//   // Render loading state
//   if (mrIsLoading) {
//     return (
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
//         {[1, 2, 3, 4].map((item) => (
//           <Skeleton key={item} className="h-[500px] w-full" />
//         ))}
//       </div>
//     );
//   }

//   // If no model results, return null or an error message
//   if (!modelResults) {
//     return <div>No model results available</div>;
//   }

//   const modelKeys = Object.keys(modelResults.data.model_performance);
//   const bestModel = modelResults.data.best_model;

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
//       {modelKeys.map((key) => {
//         const metrics = modelResults.data.model_performance[key];
//         const [vectorizer, model] = JSON.parse(key);
//         const isBestModel =
//           bestModel.vectorizer === vectorizer &&
//           bestModel.model === model;

//         return (
//           <div
//             key={key}
//             className={`border rounded-md p-4 ${getBorderStyle(key, bestModel)}`}
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold">
//                 {formatModelKey(key)}
//               </h3>
//               {isBestModel && (
//                 <span className="bg-green-500 text-white px-2 py-1 rounded-md text-sm">
//                   Best Model
//                 </span>
//               )}
//             </div>

//             <div className="grid grid-cols-2 gap-2 mb-4">
//               {Object.entries(metrics).map(([metricName, value]:any) => (
//                 <div
//                   key={metricName}
//                   className="bg-gray-100 p-2 rounded"
//                 >
//                   <p className="text-xs text-gray-600 capitalize">
//                     {metricName.replace('_', ' ')}
//                   </p>
//                   <p className="font-bold text-sm">
//                     {(value * 100).toFixed(2)}%
//                   </p>
//                 </div>
//               ))}
//             </div>

//             <div className="text-center">
//               <p className="text-sm text-gray-600 mb-2">
//                 Confusion Matrix
//               </p>
//               <img
//                 src={`http://127.0.0.1:8000/api/confusion-matrix/${vectorizer}/${model}`}
//                 alt={`Confusion Matrix for ${formatModelKey(key)}`}
//                 className="mx-auto max-h-64 object-contain border rounded"
//               />
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };




/**
 * 
 * Health Theme
🌿 Fresh & Vibrant Colors (Wellness, Energy, Vitality)

#4CAF50 (Leaf Green – Represents health and nature)

#FF9800 (Orange – Energy and warmth)

#E91E63 (Pink – Vitality and heart health)

#00BCD4 (Teal – Balance and calmness)

#FFFFFF (White – Clean and fresh look)

Politics Theme
🏛️ Professional & Trustworthy Colors (Democracy, Authority, Stability)

#1E3A5F (Deep Blue – Trust and leadership)

#D32F2F (Strong Red – Passion and power)

#FFC107 (Gold – Importance and prestige)

#E0E0E0 (Light Gray – Neutrality and diplomacy)

#FFFFFF (White – Fairness and transparency)

Business Theme
📈 Modern & Professional Colors (Growth, Innovation, Success)

#1976D2 (Bright Blue – Technology and trust)

#4CAF50 (Green – Financial growth and prosperity)

#F57C00 (Deep Orange – Motivation and energy)

#263238 (Dark Gray – Professionalism and stability)

#FAFAFA (Off White – Clarity and simplicity)
 */

