import { useState } from "react";
import commentorIcon from "../../assets/avatar.png";
import Ratings from "../../components/Ratings";
import { formateDate } from "../../utils/formateDate";
import PostAReview from "./PostAReview";

const ReviewsCard = ({ productReviews }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reviews = productReviews || [];
  const handleOpenReviewModel = () => {
    setIsModalOpen(true);
  }

  const handleCloseReviewModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="my-6 bg-white p-8">
      <div>
        {
          reviews.length > 0 ? (<div>
            <h3 className="text-lg font-medium">All Comments...</h3>
            <div>
              {
                reviews.map((review, index) => (
                  <div key={index} className="mt-4">
                    <div className="flex gap-4 items-center">
                      <img src={commentorIcon} alt="" className="size-14" />
                      <div className="relative">
                        <p className="text-lg font-medium underline capitalize underline-offset-4 text-blue-400">{review?.userId.username}</p>
                        <p className="text-[12px] italic">{formateDate(review?.createdAt)}</p>
                        <div className="absolute left-0 mt-1">
                          <Ratings rating={review?.rating} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-9 text-gray-600 border p-8">
                      <p className="md:w-4/5">{review?.comment}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>) : <p>No Reviews yet</p>
        }
      </div>

      {/* add review button */}
      <div className="mt-12">
        <button onClick={handleOpenReviewModel} className="px-6 py-3 bg-primary text-white rounded-md">
          Add a Review
        </button>
      </div>

      {/* review modal */}
      <PostAReview isModalOpen={isModalOpen} handleClose={handleCloseReviewModal} />
    </div>
  )
}
export default ReviewsCard