import {CategoryScale} from "chart.js";
import Chart from "chart.js/auto";
import {useMemo, useState} from "react";
import {PolarArea} from "react-chartjs-2";
import API from "../api";
import {Product} from "../classes/product";
import {ErrorComponent} from "./ErrorComponent";
import Spinner from "./Spinner";

export function ChartPage() {

    Chart.register(CategoryScale);

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    let randomBackgroundColor: string[] = [];
    let usedColors = new Set();

    let dynamicColors = function () {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let color = "rgb(" + r + "," + g + "," + b + ")";

        if (!usedColors.has(color)) {
            usedColors.add(color);
            return color;
        } else {
            return dynamicColors();
        }
    };


    const getProducts = () => {
        setLoading(true);
        API.get(`stores/ijpxNJLM732vm8AeajMR/products`).then(
            res => {
                setProducts(res.data)
                const uniqueCategory: string[] = Array.from(new Set(res.data.map((item: Product) => item.data.category)));
                const chartValues: number[] = [];
                uniqueCategory.forEach((category, index) => {
                    res.data.forEach((categoryProduct: Product) => {
                        if (categoryProduct.data.category === category) {
                            if (chartValues[index]) {
                                chartValues[index]++
                            } else {
                                chartValues.push(1);
                            }
                        }
                    })
                })

                uniqueCategory.forEach(() =>
                    randomBackgroundColor.push(dynamicColors()));

                setChartData({
                    labels: uniqueCategory,
                    datasets: [
                        {
                            label: "",
                            data: chartValues,
                            backgroundColor: randomBackgroundColor,
                            borderColor: "black",
                            borderWidth: 2
                        }
                    ]
                })
                setLoading(false);
            },
            error => {
                setLoading(false);
                setError(true);
            }
        );

    }
    useMemo(() => {
        getProducts()
    }, []);

    const [chartData, setChartData] = useState({
        labels: products.map((product: Product) => product.data.category),
        datasets: [
            {
                label: "",
                data: [0],
                backgroundColor: randomBackgroundColor
                ,
                borderColor: "black",
                borderWidth: 2
            }
        ]
    });

    if (loading) return <Spinner/>

    if (error) return <ErrorComponent/>

    return (
        <div className="chart-container">
            <div className={'chart'}>
                <h2 style={{textAlign: "center"}}>Product Chart</h2>
                <PolarArea
                    data={chartData}
                />
            </div>
        </div>
    );
}
