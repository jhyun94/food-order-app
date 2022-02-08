import { useState, useEffect } from "react";
import _, { add } from "lodash";
import Image from "next/image";

import Layout from "../src/components/layout";
import data from "../src/data";

export default function Hamburger() {
	const hamburgerData = {
		id: "hamburger",
		item: "Hamburger",
		price: 10,
		image: "https://www.spendwithpennies.com/wp-content/uploads/2019/05/Classic-Burger-SpendWithPennies_-2.jpg",
	};
	const addBaconData = data.modifiers[0];
	const addTomatoData = data.modifiers[1];
	const addSauceData = data.modifiers[2];
	const cartData = data.cart;

	// console.log("THIS IS DATA", hamburgerData);
	// const router = useRouter();
	// console.log("THIS IS ROUTER", router);

	const [cart, setCart] = useState([]);
	const [selectBacon, setSelectBacon] = useState(false);
	const [selectTomato, setSelectTomato] = useState(false);
	const [selectSauce, setSelectSauce] = useState(false);
	const [hamburgerPrice, setHamburgerPrice] = useState(10);
	const [hamburgerInfo, setHamburgerInfo] = useState({});

	/*
  Johnny's Code
  */

	let modifiers = _.keyBy(data.modifiers, "id");
	// add checked to hash
	_.map(modifiers, (el) => {
		el.checked = false;
	});

	const [addOns, setAddOns] = useState(modifiers);
	console.log("THIS IS ADDONS", addOns);

	const updateAddOns = (id) => {
		setAddOns((prevState) => {
			return {
				...prevState,
				[id]: {
					...prevState[id],
					checked: prevState[id].checked ? false : true,
				},
			};
		});
	};

	//loop through addons, so that it more scalable. you dont have to create update price function for each addon
	const getTotalPrice = () => {
		let total = hamburgerPrice;

		_.forEach(addOns, (item) => {
			if (item.checked) total += item.price;
		});

		return total;
	};

	/*
 END OF CODE
*/

	let tempPrice = hamburgerPrice;

	//update entire hamburger object and set that to state, use spread operator

	function handleSelectBacon(e) {
		e.preventDefault;
		setSelectBacon(!selectBacon);

		//NOT SURE WHY THIS WORKS BUT IT DOES
		if (selectBacon) {
			//setHamburgerPrice(hamburgerInfo.price + 2);
			setHamburgerInfo({
				...hamburgerData,
				price: hamburgerPrice + 2,
			});
			console.log("THIS IS BACON", hamburgerPrice);
		}
		if (!selectBacon && hamburgerInfo.price !== 10) {
			//setHamburgerPrice(hamburgerInfo.price - 2);
			setHamburgerInfo({
				...hamburgerData,
				price: hamburgerPrice - 2,
			});
			console.log("THIS IS NO BACON", hamburgerPrice);
		}
	}
	console.log("THIS HAMBURGER PRICE", hamburgerInfo);
	//console.log(selectBacon);
	//console.log("THIS IS HAMBURGER INFO BACON ADD", hamburgerInfo);

	//NOT WORKING
	function handleExtraTomato(e) {
		e.preventDefault;
		setSelectTomato(!selectTomato);

		if (selectTomato) {
			setHamburgerPrice(hamburgerInfo.price + 1);
			setHamburgerInfo({
				...hamburgerData,
				price: hamburgerPrice,
			});
		}
		if (!selectTomato && hamburgerInfo.price !== 10) {
			setHamburgerPrice(hamburgerInfo.price - 1);
			setHamburgerInfo({
				...hamburgerData,
				price: hamburgerPrice,
			});
		}
		//console.log("THIS IS THE EVENT", e);
	}

	// function handleExtraSauce(e) {
	//     e.preventDefault;
	//     setSelectSauce(!selectSauce);
	//     if (!selectSauce) {
	//         setHamburgerPrice(+hamburgerPrice + +e.target.value);
	//     }
	//     if (selectSauce && hamburgerPrice !== 10) {
	//         setHamburgerPrice(+hamburgerPrice - +e.target.value);
	//     }
	//     hamburgerData.price = hamburgerPrice;
	// }

	function handleAddToCart() {
		//add hamburger hamburgerPrice to data cart array
		//spread in rest of hamburger object
		hamburgerData.price = hamburgerPrice;
		setHamburgerInfo(hamburgerData);
		setCart([...cart, hamburgerInfo]);
		console.log("THIS IS THE CART", cart);
	}

	// useEffect(() => {
	//     setHamburgerPrice(+hamburgerPrice - 2);
	// }, [selectBacon]);

	function handleChangeBacon(e) {}

	function handleChangeTomato(e) {}

	// function handleChangeSauce(e) {
	//     console.log("THIS IS HAMBURGER hamburgerPrice", hamburgerPrice);
	//     console.log("THIS IS HANDLE CHANGE", e.target.value);
	// }

	return (
		<Layout>
			<section className="text-gray-600 body-font overflow-hidden">
				<div className="container px-5 py-24 mx-auto">
					<div className="lg:w-4/5 mx-auto flex flex-wrap">
						<div className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded">
							<Image
								alt="ecommerce"
								src={hamburgerData.image}
								width="400"
								height="400"
							/>
						</div>
						<div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
							<h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
								{hamburgerData.item} - ${hamburgerData.price}
							</h1>

							<p className="leading-relaxed">
								Fam locavore kickstarter distillery. Mixtape
								chillwave tumeric sriracha taximy chia
								microdosing tilde DIY. XOXO fam indxgo
								juiceramps cornhole raw denim forage brooklyn.
								Everyday carry +1 seitan poutine tumeric.
								Gastropub blue bottle austin listicle pour-over,
								neutra jean shorts keytar banjo tattooed umami
								cardigan.
							</p>
							{/* flex mt-6 space-x-4 grid grid-cols-3 gap-4 mb-5 */}
							{/* "" */}
							<div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 gap-4 mb-5">
								<div className="flex">
									<span className="mr-3">
										Add Bacon $2.00
									</span>
									<input
										className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"
										type="radio"
										checked={addOns.bacon.checked}
										value="2"
										onClick={() => updateAddOns("bacon")}
										// onChange={() => updateAddOns("bacon")}
									/>
								</div>
								<div className="flex">
									<span className="mr-3">
										Extra Tomato $1.00
									</span>
									<input
										className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"
										type="radio"
										checked={addOns.tomato.checked}
										value={addTomatoData.price}
										onClick={() => updateAddOns("tomato")}
										// onChange={() => updateAddOns("tomato")}
									/>
								</div>
								{/* <div className="flex">
                                <span className="mr-3">
                                    Extra Sauce $1.00
                                </span>
                                <input
                                    className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"
                                    type="radio"
                                    checked={selectSauce}
                                    value={addSauceData.price}
                                    onClick={handleExtraSauce}
                                    onChange={handleChangeSauce}
                                />
                            </div> */}
							</div>
							<div className="flex">
								<span
									className="title-font font-medium text-2xl text-gray-900"
									// value={hamburgerPrice}
								>
									{getTotalPrice()}
								</span>

								<button
									className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
									onClick={handleAddToCart}
								>
									Add To Cart
								</button>

								<button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
									<svg
										fill="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										className="w-5 h-5"
										viewBox="0 0 24 24"
									>
										<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
}
