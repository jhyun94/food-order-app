import { useState } from "react";
import Image from "next/image";
// import data from "../src/data";

import UserCart from "../src/components/cart";
import Layout from "../src/components/layout";
import _ from "lodash";

export default function Cart() {
	return (
		<Layout>
			<UserCart />
		</Layout>
	);
}
