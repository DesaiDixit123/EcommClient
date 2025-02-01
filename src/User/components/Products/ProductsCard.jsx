/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import { FaCodeBranch, FaEye, FaHeart, FaRegStar, FaShoppingCart, FaStar } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { getCartByUserId, UserAddRatingProduct, userAddToCart, userAddToWishlist, UserValidation } from "../../redux/User/UserThunk";
// import { useState } from "react"; 
// import { Modal, Button, Rating, TextField } from "@mui/material";

// export const ProductCard =({ product })=> {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [rating, setRating] = useState(0); // Track the user's rating
//   const [comment, setComment] = useState(""); // Track the user's comment
//   const [openModal, setOpenModal] = useState(false); // Track the modal visibility

//   const handleImageClick = () => {
//     navigate(`/viewProduct/${product._id}`);
//   };

//   const ratingPercentage = (rating / 5) * 100;

//   const { userData } = useSelector((state) => state.user);

//   const truncatedTitle =
//     product.title.split(" ").length > 5
//       ? `${product.title.split(" ").slice(0, 4).join(" ")}...`
//       : product.title;

//   const regularPrice = Number(product.price);
//   const discountPrice = Number(product.discount);
//   const discountPercentage = Math.round(
//     ((regularPrice - discountPrice) / regularPrice) * 100
//   );

//   const formatPriceWithCommas = (price) => {
//     const priceString = price.toString();
//     const lastThreeDigit = priceString.slice(-3);
//     const otherDigits = priceString.slice(0, -3);
//     const formattedOtherDigits = otherDigits.replace(
//       /\B(?=(\d{2})+(?!\d))/g,
//       ","
//     );
//     return otherDigits
//       ? `${formattedOtherDigits},${lastThreeDigit}`
//       : lastThreeDigit;
//   };

//   const handleAddToWishlist = async (productId) => {
//     if (!userData) {
//       toast.success("Please log in to add items to your wishlist.");
//       return;
//     }
//     await dispatch(
//       userAddToWishlist({
//         productId,
//         userId: userData._id,
//         toast,
//       })
//     );

//     const validationResult = await dispatch(UserValidation());
//     if (validationResult) {
//       console.log(
//         "User validated successfully, staying on the same product page."
//       );
//     }
//   };

//   const handleAddToCart = async (productId) => {
//     if (!userData) {
//       toast.success("Please log in to add items to your cart.");
//       return;
//     }

//     const quantity = 1;
//     const price = Number(product.price);
//     const subTotal = price * quantity;

//     await dispatch(
//       userAddToCart({
//         productId,
//         userId: userData._id,
//         quantity,
//         subTotal: Number(subTotal),
//         toast,
//       })
//     );
//     dispatch(getCartByUserId(userData._id));

//     const validationResult = await dispatch(UserValidation());
//     if (validationResult) {
//       console.log(
//         "User validated successfully, staying on the same product page."
//       );
//     }
//   };

//   // Open modal to give rating
//   const handleRatingClick = (starIndex) => {
//     setRating(starIndex + 1); 
//   };

//   // Close rating modal
//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

  
//   const handleRatingSubmit = async () => {
//     if (!userData) {
//       toast.error("Please log in to submit a rating.");
//       return;
//     }

//     const formData = {
//       productId: product._id,
//       userId: userData._id,
//       rating,
//       comment,
//     };

//     // Dispatch the thunk to add the rating
//     const response = await dispatch(UserAddRatingProduct({ formData, toast }));

//     // Check the response after the API call
//     if (response?.payload) {
//       toast.success(`You rated this product ${rating} stars!`);
//       toast.info(`Your comment: ${comment}`);
//       setOpenModal(false); // Close the modal
//     }
//   };
//   return (
//     <div
//       key={product._id}
//       className="w-[280px] sm:w-[300px] md:w-[320px] lg:w-[280px] xl:w-[280px] border-2 border-purple-400 px-[20px] py-[20px] rounded-[10px] relative group overflow-hidden hover:shadow-lg shadow-gray-500/50"
//     >
//       <div
//         className="overflow-hidden rounded-2.5 relative cursor-pointer"
//         onClick={handleImageClick}
//       >
//         <img
//           src={product.img1}
//           alt=""
//           className="imagesds rounded-2.5 transform transition-all duration-300 group-hover:scale-110 rounded-[10px] ease-in-out"
//         />
//       </div>

//       <div className="z-30 flex justify-center items-center border2 border-topnavBorderBottom-400 bg-purple-400 w-[80px] h-[40px] text-[50px] absolute top-8 right-5 rounded-[20px] text-gray-800">
//         <p className="text-[25px]">-{discountPercentage}%</p>
//       </div>

//       <div className="pt-[10px] relative">
//         <div className="flex justify-between">
//           <div>{product.category}</div>
//           <div>{product.fields}</div>
//         </div>
//         <div className="pt-[10px] text-[20px] font-bold">{truncatedTitle}</div>
//         <div className="flex gap-[10px] pt-[10px]">
//         <div className="flex items-center gap-2.5 text-lg cursor-pointer">
//             {[...Array(5)].map((_, index) => (
//               <span
//                 key={index}
//                 onClick={() => handleRatingClick(index)}
//                 className={`text-xl ${rating > index ? "text-yellow-500" : "text-gray-300"}`}
//               >
//                 {rating > index ? <FaStar /> : <FaRegStar />}
//               </span>
//             ))}
//           </div>

//           {/* Display Rating Percentage */}
//           <p className="text-[20px]">{`${ratingPercentage}%`}</p>
//         </div>

//         <div className="flex gap-[20px] text-[20px]">
//           <div className="text-[25px] text-topnavBorderBottom-400">
//             ₹ {formatPriceWithCommas(discountPrice)}
//           </div>
//           <div className="line-through pt-[6px] text-gray-500">
//             ₹ {formatPriceWithCommas(regularPrice)}
//           </div>
//           <button
//             type="button"
//             className="border-2 border-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] absolute -right-2 bottom-7 z-50"
//             data-toggle="tooltip"
//             data-placement="top"
//             title="Add To Cart"
//             onClick={() => handleAddToCart(product._id)}
//           >
//             <span className="text-[23px]">
//               <FaShoppingCart className="" />
//             </span>
//           </button>
//         </div>
//       </div>

//       <div className="gap-12.5 absolute top-28 pl-12.5 right-[-8rem] group-hover:right-1/2 group-hover:translate-x-1/2 transition-all duration-30 gap-[20px]">
//         <div className="flex gap-[20px]">
//           <div>
//             <button
//               type="button"
//               className="border-2 border-gray-500 text-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] bg-topnav-400"
//               data-toggle="tooltip"
//               data-placement="top"
//               title="Quick View"
//               onClick={handleImageClick}
//             >
//               <span className="text-[23px]">
//                 <FaEye className="" />
//               </span>
//             </button>
//           </div>
//           <div>
//             <button
//               type="button"
//               className="border-2 border-gray-500 text-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] bg-topnav-400"
//               data-toggle="tooltip"
//               data-placement="top"
//               title="Add To Wishlist"
//               onClick={() => handleAddToWishlist(product._id)}
//             >
//               <span className="text-[23px]">
//                 <FaHeart className="" />
//               </span>
//             </button>
//           </div>
//         </div>
//         <div className="pt-[15px]">
//           <button
//             type="button"
//             className="border-2 border-gray-500 text-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] bg-topnav-400"
//             data-toggle="tooltip"
//             data-placement="top"
//             title="Compare"
//           >
//             <span className="text-[23px]">
//               <FaCodeBranch className="" />
//             </span>
//           </button>
//         </div>
//       </div>

//       {/* Rating Modal */}
//       <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-rating-title" aria-describedby="modal-rating-description">
//         <div className="modal-content bg-white p-6 rounded-[10px] max-w-md mx-auto">
//           <h2 id="modal-rating-title" className="text-[24px] font-bold text-purple-600 mb-4">
//             Rate this Product
//           </h2>
//           <Rating
//             name="product-rating"
//             value={rating}
//             onChange={(e, newValue) => setRating(newValue)}
//             size="large"
//             className="mb-4"
//           />
//           <TextField
//             label="Add a comment"
//             multiline
//             rows={4}
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             variant="outlined"
//             fullWidth
//             className="mb-4"
//             placeholder="Write a comment..."
//           />
//           <Button variant="contained" color="primary" onClick={handleRatingSubmit} fullWidth>
//             Submit Rating
//           </Button>
//         </div>
//       </Modal>
//     </div>
//   );
// }
















// /* eslint-disable react/prop-types */
// import { FaCodeBranch, FaEye, FaHeart, FaRegStar, FaStar, FaShoppingCart } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { getCartByUserId, UserAddRatingProduct, userAddToCart, userAddToWishlist, UserValidation } from "../../redux/User/UserThunk";
// import { useState } from "react";
// import { Modal, Button, Rating, TextField } from "@mui/material";

// export const ProductCard = ({ product }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [rating, setRating] = useState(0); // Track the user's rating
//   const [comment, setComment] = useState(""); // Track the user's comment
//   const [openModal, setOpenModal] = useState(false); // Track the modal visibility

//   const handleImageClick = () => {
//     navigate(`/viewProduct/${product._id}`);
//   };

//   const ratingPercentage = (rating / 5) * 100;

//   const { userData } = useSelector((state) => state.user);

//   const truncatedTitle =
//     product.title.split(" ").length > 5
//       ? `${product.title.split(" ").slice(0, 4).join(" ")}...`
//       : product.title;

//   const regularPrice = Number(product.price);
//   const discountPrice = Number(product.discount);
//   const discountPercentage = Math.round(
//     ((regularPrice - discountPrice) / regularPrice) * 100
//   );

//   const formatPriceWithCommas = (price) => {
//     const priceString = price.toString();
//     const lastThreeDigit = priceString.slice(-3);
//     const otherDigits = priceString.slice(0, -3);
//     const formattedOtherDigits = otherDigits.replace(
//       /\B(?=(\d{2})+(?!\d))/g,
//       ","
//     );
//     return otherDigits
//       ? `${formattedOtherDigits},${lastThreeDigit}`
//       : lastThreeDigit;
//   };

//   const handleAddToWishlist = async (productId) => {
//     if (!userData) {
//       toast.success("Please log in to add items to your wishlist.");
//       return;
//     }
//     await dispatch(
//       userAddToWishlist({
//         productId,
//         userId: userData._id,
//         toast,
//       })
//     );

//     const validationResult = await dispatch(UserValidation());
//     if (validationResult) {
//       console.log(
//         "User validated successfully, staying on the same product page."
//       );
//     }
//   };

//   const handleAddToCart = async (productId) => {
//     if (!userData) {
//       toast.success("Please log in to add items to your cart.");
//       return;
//     }

//     const quantity = 1;
//     const price = Number(product.price);
//     const subTotal = price * quantity;

//     await dispatch(
//       userAddToCart({
//         productId,
//         userId: userData._id,
//         quantity,
//         subTotal: Number(subTotal),
//         toast,
//       })
//     );
//     dispatch(getCartByUserId(userData._id));

//     const validationResult = await dispatch(UserValidation());
//     if (validationResult) {
//       console.log(
//         "User validated successfully, staying on the same product page."
//       );
//     }
//   };

//   // Open modal to give rating
//   const handleRatingClick = () => {
//     setOpenModal(true); // Open the modal when the user clicks to rate
//   };

//   // Close rating modal
//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   const handleRatingSubmit = async () => {
//     if (!userData) {
//       toast.error("Please log in to submit a rating.");
//       return;
//     }

//     const formData = {
//       productId: product._id,
//       userId: userData._id,
//       rating,
//       comment,
//     };

//     // Dispatch the thunk to add the rating
//     const response = await dispatch(UserAddRatingProduct({ formData, toast }));

//     // Check the response after the API call
//     if (response?.payload) {
//       toast.success(`You rated this product ${rating} stars!`);
//       toast.info(`Your comment: ${comment}`);
//       setOpenModal(false); // Close the modal after rating submission
//     }
//   };

//   return (
//     <div
//       key={product._id}
//       className="w-[280px] sm:w-[300px] md:w-[320px] lg:w-[280px] xl:w-[280px] border-2 border-purple-400 px-[20px] py-[20px] rounded-[10px] relative group overflow-hidden hover:shadow-lg shadow-gray-500/50"
//     >
//       <div
//         className="overflow-hidden rounded-2.5 relative cursor-pointer"
//         onClick={handleImageClick}
//       >
//         <img
//           src={product.img1}
//           alt=""
//           className="imagesds rounded-2.5 transform transition-all duration-300 group-hover:scale-110 rounded-[10px] ease-in-out"
//         />
//       </div>

//       <div className="z-30 flex justify-center items-center border2 border-topnavBorderBottom-400 bg-purple-400 w-[80px] h-[40px] text-[50px] absolute top-8 right-5 rounded-[20px] text-gray-800">
//         <p className="text-[25px]">-{discountPercentage}%</p>
//       </div>

//       <div className="pt-[10px] relative">
//         <div className="flex justify-between">
//           <div>{product.category}</div>
//           <div>{product.fields}</div>
//         </div>
//         <div className="pt-[10px] text-[20px] font-bold">{truncatedTitle}</div>
//         <div className="flex gap-[10px] pt-[10px]">
//           <div className="flex items-center gap-2.5 text-lg cursor-pointer">
//             {[...Array(5)].map((_, index) => (
//               <span
//                 key={index}
//                 onClick={() => handleRatingClick()}
//                 className={`text-xl ${rating > index ? "text-yellow-500" : "text-gray-300"}`}
//               >
//                 {rating > index ? <FaStar /> : <FaRegStar />}
//               </span>
//             ))}
//           </div>

//           {/* Display Rating Percentage */}
//           <p className="text-[20px]">{`${ratingPercentage}%`}</p>
//         </div>

//         <div className="flex gap-[20px] text-[20px]">
//           <div className="text-[25px] text-topnavBorderBottom-400">
//             ₹ {formatPriceWithCommas(discountPrice)}
//           </div>
//           <div className="line-through pt-[6px] text-gray-500">
//             ₹ {formatPriceWithCommas(regularPrice)}
//           </div>
//           <button
//             type="button"
//             className="border-2 border-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] absolute -right-2 bottom-7 z-50"
//             data-toggle="tooltip"
//             data-placement="top"
//             title="Add To Cart"
//             onClick={() => handleAddToCart(product._id)}
//           >
//             <span className="text-[23px]">
//               <FaShoppingCart className="" />
//             </span>
//           </button>
//         </div>
//       </div>

//       {/* Rating Modal */}
//       <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-rating-title" aria-describedby="modal-rating-description">
//         <div className="modal-content bg-white p-6 rounded-[10px] max-w-md mx-auto">
//           <h2 id="modal-rating-title" className="text-[24px] font-bold text-purple-600 mb-4">
//             Rate this Product
//           </h2>
//           <Rating
//             name="product-rating"
//             value={rating}
//             onChange={(e, newValue) => setRating(newValue)}
//             size="large"
//             className="mb-4"
//           />
//           <TextField
//             label="Add a comment"
//             multiline
//             rows={4}
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             variant="outlined"
//             fullWidth
//             className="mb-4"
//             placeholder="Write a comment..."
//           />
//           <Button variant="contained" color="primary" onClick={handleRatingSubmit} fullWidth>
//             Submit Rating
//           </Button>
//         </div>
//       </Modal>
//     </div>
//   );
// }









import { FaCodeBranch, FaEye, FaHeart, FaRegStar, FaShoppingCart, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCartByUserId, UserAddRatingProduct, userAddToCart, userAddToWishlist, UserValidation } from "../../redux/User/UserThunk";
import { useState, useEffect } from "react"; 
import { Modal, Button, Rating, TextField } from "@mui/material";
import axios from "axios";

export const ProductCard =({ product })=> {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0); // Track the user's rating
  const [comment, setComment] = useState(""); // Track the user's comment
  const [openModal, setOpenModal] = useState(false); // Track the modal visibility
  const [averageRating, setAverageRating] = useState(0); // Store the average rating

  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch the average rating when the component mounts
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(`/api/product/${product._id}/average`);
        setAverageRating(response.data.averageRating);
      } catch (error) {
        console.error("Error fetching average rating:", error);
      }
    };

    fetchAverageRating();
  }, [product._id]); // Re-fetch if the product changes

  const handleImageClick = () => {
    navigate(`/viewProduct/${product._id}`);
  };

  // const ratingPercentage = (rating / 5) * 100;



  const calculateStarColor = (percentage) => {
    if (percentage >= 80) {
      return "bg-yellow-500"; // More than 80% -> Yellow
    } else if (percentage >= 60) {
      return "bg-yellow-400"; // 60% to 79% -> Light yellow
    } else if (percentage >= 40) {
      return "bg-yellow-300"; // 40% to 59% -> Lighter yellow
    } else {
      return "bg-gray-300"; // Below 40% -> Gray
    }
  };

  const truncatedTitle =
    product.title.split(" ").length > 5
      ? `${product.title.split(" ").slice(0, 4).join(" ")}...`
      : product.title;

  const regularPrice = Number(product.price);
  const discountPrice = Number(product.discount);
  const discountPercentage = Math.round(
    ((regularPrice - discountPrice) / regularPrice) * 100
  );

  const formatPriceWithCommas = (price) => {
    const priceString = price.toString();
    const lastThreeDigit = priceString.slice(-3);
    const otherDigits = priceString.slice(0, -3);
    const formattedOtherDigits = otherDigits.replace(
      /\B(?=(\d{2})+(?!\d))/g,
      ","
    );
    return otherDigits
      ? `${formattedOtherDigits},${lastThreeDigit}`
      : lastThreeDigit;
  };

  const handleAddToWishlist = async (productId) => {
    if (!userData) {
      toast.success("Please log in to add items to your wishlist.");
      return;
    }
    await dispatch(
      userAddToWishlist({
        productId,
        userId: userData._id,
        toast,
      })
    );

    const validationResult = await dispatch(UserValidation());
    if (validationResult) {
      console.log(
        "User validated successfully, staying on the same product page."
      );
    }
  };

  const handleAddToCart = async (productId) => {
    if (!userData) {
      toast.success("Please log in to add items to your cart.");
      return;
    }

    const quantity = 1;
    const price = Number(product.price);
    const subTotal = price * quantity;

    await dispatch(
      userAddToCart({
        productId,
        userId: userData._id,
        quantity,
        subTotal: Number(subTotal),
        toast,
      })
    );
    dispatch(getCartByUserId(userData._id));

    const validationResult = await dispatch(UserValidation());
    if (validationResult) {
      console.log(
        "User validated successfully, staying on the same product page."
      );
    }
  };

  // Open modal to give rating
  const handleRatingClick = (starIndex) => {
    setRating(starIndex + 1); 
    setOpenModal(true); 
  };

  // Close rating modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleRatingSubmit = async () => {
    if (!userData) {
      toast.error("Please log in to submit a rating.");
      return;
    }

    const formData = {
      productId: product._id,
      userId: userData._id,
      rating,
      comment,
    };

    // Dispatch the thunk to add the rating
    const response = await dispatch(UserAddRatingProduct({ formData, toast }));

    // Check the response after the API call
    if (response?.payload) {
      toast.success(`You rated this product ${rating} stars!`);
      toast.info(`Your comment: ${comment}`);
      setOpenModal(false); // Close the modal

      // Update the average rating after a successful rating submission
      const updatedRatingResponse = await axios.get(`/api/products/${product._id}/average-rating`);
      setAverageRating(updatedRatingResponse.data.averageRating);
    }
  };

  return (
    <div
      key={product._id}
      className="w-[280px] sm:w-[300px] md:w-[320px] lg:w-[280px] xl:w-[280px] border-2 border-purple-400 px-[20px] py-[20px] rounded-[10px] relative group overflow-hidden hover:shadow-lg shadow-gray-500/50"
    >
      <div
        className="overflow-hidden rounded-2.5 relative cursor-pointer"
        onClick={handleImageClick}
      >
        <img
          src={product.img1}
          alt=""
          className="imagesds rounded-2.5 transform transition-all duration-300 group-hover:scale-110 rounded-[10px] ease-in-out"
        />
      </div>

      <div className="z-30 flex justify-center items-center border2 border-topnavBorderBottom-400 bg-purple-400 w-[80px] h-[40px] text-[50px] absolute top-8 right-5 rounded-[20px] text-gray-800">
        <p className="text-[25px]">-{discountPercentage}%</p>
      </div>

      <div className="pt-[10px] relative">
        <div className="flex justify-between">
          <div>{product.category}</div>
          <div>{product.fields}</div>
        </div>
        <div className="pt-[10px] text-[20px] font-bold">{truncatedTitle}</div>
        <div className="flex gap-[10px] pt-[10px]">
          <div className="flex items-center gap-2.5 text-lg cursor-pointer">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                onClick={() => handleRatingClick(index)}
                className={`text-xl ${rating > index ? "text-yellow-500" : "text-gray-300"}`}
              >
                {rating > index ? <FaStar /> : <FaRegStar />}
              </span>
            ))}
          </div>

          {/* Display Average Rating Percentage */}
          <p className="text-[20px]">{`${(averageRating / 5) * 100}%`}</p>
        </div>

        <div className="flex gap-[20px] text-[20px]">
          <div className="text-[25px] text-topnavBorderBottom-400">
            ₹ {formatPriceWithCommas(discountPrice)}
          </div>
          <div className="line-through pt-[6px] text-gray-500">
            ₹ {formatPriceWithCommas(regularPrice)}
          </div>
          <button
            type="button"
            className="border-2 border-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] absolute -right-2 bottom-7 z-50"
            data-toggle="tooltip"
            data-placement="top"
            title="Add To Cart"
            onClick={() => handleAddToCart(product._id)}
          >
            <span className="text-[23px]">
              <FaShoppingCart className="" />
            </span>
          </button>
        </div>
      </div>

      <div className="gap-12.5 absolute top-28 pl-12.5 right-[-8rem] group-hover:right-1/2 group-hover:translate-x-1/2 transition-all duration-30 gap-[20px]">
        <div className="flex gap-[20px]">
          <div>
            <button
              type="button"
              className="border-2 border-gray-500 text-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] bg-topnav-400"
              data-toggle="tooltip"
              data-placement="top"
              title="Quick View"
              onClick={handleImageClick}
            >
              <span className="text-[23px]">
                <FaEye className="" />
              </span>
            </button>
          </div>
          <div>
            <button
              type="button"
              className="border-2 border-gray-500 text-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] bg-topnav-400"
              data-toggle="tooltip"
              data-placement="top"
              title="Add To Wishlist"
              onClick={() => handleAddToWishlist(product._id)}
            >
              <span className="text-[23px]">
                <FaHeart className="" />
              </span>
            </button>
          </div>
        </div>
        <div className="pt-[15px]">
          <button
            type="button"
            className="border-2 border-gray-500 text-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] bg-topnav-400"
            data-toggle="tooltip"
            data-placement="top"
            title="Compare"
          >
            <span className="text-[23px]">
              <FaCodeBranch className="" />
            </span>
          </button>
        </div>
      </div>

      {/* Rating Modal */}
      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-rating-title" aria-describedby="modal-rating-description">
        <div className="modal-content bg-white p-6 rounded-[10px] max-w-md mx-auto">
          <h2 id="modal-rating-title" className="text-[24px] font-bold text-purple-600 mb-4">
            Rate this Product
          </h2>
          <Rating
            name="rating"
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
            precision={0.5}
            size="large"
          />
          <TextField
            label="Leave a Comment"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-4"
          />
          <div className="mt-4 flex justify-between">
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleRatingSubmit}>Submit Rating</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
