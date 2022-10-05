import Link from "next/link";
import React, { useState } from "react";
import GuestsAPIs from "../../api/guests";
import Loading from "../../components/Loading";
import { GuestDecision, IGuest } from "../../models/guests";
import styles from "../../styles/Home.module.css";
import Swal from "sweetalert2";
import Router from "next/router";

export type ContextType = {
  params: {
    [name: string]: string;
  };
};
const GuestPage = ({ guest }: { guest: IGuest }) => {
  const [buttonLoading, setButtonLoading] =
    useState<GuestDecision>("NOT_DECIDED");
  const [currentDecision, setCurrentDecision] = useState(guest.accepted);
  const changeDecision = async (descision: GuestDecision) => {
    setButtonLoading(descision);
    await GuestsAPIs.ChangeDecision(guest.mobileNumber, descision);

    setButtonLoading("NOT_DECIDED");
    setCurrentDecision(descision);
    if (descision === "YES") {
      Swal.fire({
        icon: "success",
        title: "پاسخ شما ثبت گردید",
        text: "هم اکنون به صفحه دریافت آدرس مراسم هدایت میشوید",
        confirmButtonText: "تایید",
      });
      Router.push("/");
      return;
    }
    Swal.fire({
      icon: "error",
      title: "پاسخ شما ثبت گردید",
      text: "از اینکه شما را در جمع خود نداریم متاسفیم",
      confirmButtonText: "بستن",
    });
  };
  return (
    <div className={styles.slide}>
      <div className={styles.rsvp}>
        <div className={styles.rsvpNames}>
          <span className={styles.greenChar}>B</span>ita&nbsp;
          <span className={styles.greenChar}>&amp;</span>&nbsp;
          <span className={styles.greenChar}>J</span>avad
        </div>
        <div className={styles.invitationBox}>
          <div className={styles.hashtag}>#BandJWedding</div>
          <div className={styles.invitationContent}>
            <div className={styles.invitationDate}>۲۲ مهر ۱۴۰۱</div>
            <div className={styles.invitationTitle}>مراسم عروسی</div>
            <div className={styles.invitationText}>
              {guest.gender === "MALE"
                ? "جناب آقای"
                : guest.gender == "FEMALE"
                ? "سرکار خانم"
                : ""}
              &nbsp;
              <span className={styles.invitedName}>
                {guest.firstName} {guest.lastName}
              </span>
              ، بدین وسیله از شما
              {guest.family && " و خانواده محترم "} دعوت میگردد، با حضورتان در
              این جشن مراسم ما را زیباتر گردانید.
            </div>
            <div className={styles.invitationText}>
              {currentDecision === "YES" && (
                <span>
                  شما قبلا اعلام کرده اید که در مراسم حضور
                  <strong> خواهید</strong> داشت.
                </span>
              )}
              {currentDecision === "NO" && (
                <span>
                  شما قبلا اعلام کرده اید که در مراسم حضور
                  <strong> نخواهید</strong> داشت.
                </span>
              )}
              {currentDecision !== "NOT_DECIDED" && (
                <span>در صورت تمایل میتوانید پاسختان را تغییر دهید. </span>
              )}
              آیا مایل به حضور در مراسم هستید؟
            </div>
            <div className={styles.buttonsContainer}>
              <button
                className={`${styles.buttonAccept} ${styles.button}`}
                onClick={() => changeDecision("YES")}
              >
                {buttonLoading === "YES" ? <Loading /> : "بله شرکت میکنم"}
              </button>
              <button
                className={`${styles.buttonReject} ${styles.button}`}
                onClick={() => changeDecision("NO")}
              >
                {buttonLoading === "NO" ? <Loading /> : "خیر شرکت نمیکنم"}
              </button>
            </div>
            <div className={styles.addressButtonContainer}>
              <Link
                href="/"
                className={`${styles.button} ${styles.addressButton}`}
              >
                مکان برگزاری مراسم
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rsvpImage} />
    </div>
  );
};
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking", // can also be true or 'blocking'
  };
}
export async function getStaticProps(context: ContextType) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const res = await GuestsAPIs.Get(context.params.phoneNumber);
  const guest = res.data;

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      guest,
    },
  };
}
export default GuestPage;
