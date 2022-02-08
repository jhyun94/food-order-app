import { useState, useEffect } from "react";
import _, { add, set } from "lodash";
import Image from "next/image";
import Link from "next/link";

import Layout from "../../src/components/layout";
import data from "../../src/data";

//const userCart = JSON.parse(localStorage.getItem("userCart"));

export default function Hamburger() {
	const [cart, setCart] = useState([]);
	const [hamburgerData, setHamburgerData] = useState(data.burgers[0]);
	const [hamburgerPrice, setHamburgerPrice] = useState(10);
  const [currentOrder, setCurrentOrder] = useState(data.burgers[0]);

	let modifiers = _.keyBy(data.modifiers, "id");
	_.map(modifiers, (mod) => {
		mod.checked = false;
	});

  const [addOns, setAddOns] = useState(modifiers);

	function updateAddOns(id) {
		setAddOns((prevState) => {
			//console.log("THIS IS PREVSTATE", prevState[id]);
			return {
				...prevState,
				[id]: {
					//if previous state isnt brought in here, object will only be checked
					...prevState[id],
					checked: prevState[id].checked ? false : true,
				},
			};
		});
	}

	const getTotalPrice = () => {
		let total = hamburgerPrice;
		_.forEach(addOns, (mod) => {
			if (mod.checked) total += mod.price;
		});

		// console.log(total);
		return total;
	};

  useEffect(() => {
    let userCart = localStorage.getItem("userCart");

    if (userCart) {
      setCart(JSON.parse(userCart));
    }
  }, [])


	//updating hamburgerData state price when addOns state is changed
	useEffect(() => {
		// _.map(addOns, (modifier) => {
		// 	//reading as checked.  figure out how to push mods into an array in hamData object
		// 	if (modifier.checked) {
		// 		setHamburgerData({
		// 			...hamburgerData,
		// 			modifiers: modifier.item,
		// 		});
		// 		//hamburgerData.modifiers = modifier.item;
		// 	}
		// });
		setHamburgerData({
			...hamburgerData,
			price: getTotalPrice(),
			// return {
			// 	modifiers: {
			// 		...prevState,
			// 		getMod() {},
			// 	},
			// };
		});
	}, [addOns]);
	//console.log("THIS IS USE EFFECT", hamburgerData);

	function handleAddToCart() {
    _.forEach(addOns, (mod) => {
			if (mod.checked) {
        currentOrder.modifiers.push(mod.item);
      }
		});

    currentOrder.price = getTotalPrice();
    setCart([...cart, currentOrder]);

	}

	// console.log("THIS IS ADD ONS", addOns);

	useEffect(() => {
		localStorage.setItem("userCart", JSON.stringify(cart));
	}, [cart]);

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
								{hamburgerData.item} - ${getTotalPrice()}
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
							<div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 gap-4 mb-5">
								{_.map(addOns, (mod) => {
									//console.log("THIS IS MOD", mod);
									return (
										<div className="flex">
											<span className="mr-3">
												Add {mod.item} $
												{mod.price.toFixed(2)}
											</span>
											<input
												className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"
												type="radio"
												checked={mod.checked}
												value="2"
												onClick={() =>
													updateAddOns(mod.id)
												}
												onChange={(e) => {}}
											/>
										</div>
									);
								})}

							</div>
							<div className="flex">
								<span
									className="title-font font-medium text-2xl text-gray-900"
									// value={hamburgerPrice}
								>
									{/* ${getTotalPrice()} */}
								</span>

								{/* <Link href="/cart" passHref> */}
								<button
									className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
									onClick={handleAddToCart}
									onChange={(e) => {}}
								>
									Add To Cart
								</button>
								{/* </Link> */}
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
