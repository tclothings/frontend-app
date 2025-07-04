"use client";

import { ArrowPathIcon, CheckCircleIcon, HomeIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// import { useEffect } from "react";
// import { useSearchParams } from "next/navigation";

export default function ConfirmPayment() {
  const router = useRouter()
  // const searchParams = useSearchParams();
  // const reference = searchParams.get("reference");

  // useEffect(() => {
  //   if (reference) {
  //     console.log(reference);
  //   }
  // }, [reference]);
  const searchParams = useSearchParams();
  // const [transactionReference, setTransactionReference] = useState(null);
  // const [orderStatus, setOrderStatus] = useState("processing"); // 'processing', 'confirmed', 'failed', 'no-reference', 'error'
  // const [orderInfo, setOrderInfo] = useState(null); // To store more detailed order info

  useEffect(() => {
    const ref = searchParams.get("reference") || searchParams.get("trxref"); // Paystack uses 'reference' or 'trxref'
    if (ref) {
      setTimeout(() => {
        goToHome()
      }, 5000)

    } else {
      console.warn("No transaction reference found in URL.");
    }
  }, [searchParams]);

  const goToHome = () => {
    router.replace("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full dark:bg-black p-8 md:p-12 rounded-lg shadow-xl text-center">
        <div className="flex justify-center items-center h-20 mb-6">
          <ArrowPathIcon
            className={`text-blue-600 animate-spin w-20 h-20 mx-auto mb-6`}
          />
        </div>{" "}
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg mb-4">
          Your order is being processed. Please wait a moment while we confirm
          the details...
        </p>
        <p className="text-md ">
          You will receive an email confirmation with your order details
          shortly.
        </p>{" "}
        <div className="mt-8">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 focus:outline-none transition duration-150 ease-in-out"
          >
            <HomeIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            Return to Homepage
          </a>
        </div>
        {/* {transactionReference && orderStatus !== "no-reference" && (
          <p className="text-sm text-gray-400 mt-6">
            Transaction Reference:{" "}
            <span className="font-mono text-gray-500">
              {transactionReference}
            </span>
          </p>
        )} */}
      </div>
    </div>
  );
}
