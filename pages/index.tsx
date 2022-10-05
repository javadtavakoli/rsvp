import type { NextPage } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker } from "react-leaflet";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import GuestsAPIs from "../api/guests";
import { IGuest } from "../models/guests";
const LocationMap = dynamic(() => import("../components/Map"), { ssr: false });

const Home = ({ guest }: { guest: IGuest }) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div
          className={`${styles.slide} ${styles.addressSlide}`}
          id="address-slide"
        >
          <h1 className={styles.slideTitle}>مکان برگزاری مراسم</h1>
          <div className={styles.address}>
            <span className={styles.addressTitle}>آدرس:</span> سیرجان - جاده
            تهران - کاظم آباد - به سمت امامزاده محمد - پیچ سوم - کوچه عطار - باغ
            افلاطونی
          </div>
          <div className={styles.mapContainer}>
            <LocationMap />
          </div>

          <div className={styles.navigation}>
            <div className={styles.navigationTitle}>مسیریابی</div>
            <div>
              محل برگزاری با کلیک بر روی نرم افزار مورد نظر مسیریابی میگردد
            </div>
            <div className={styles.navigationLinks}>
              <a href="https://www.google.com/maps/dir/?api=1&destination=29.565774%2C55.545162">
                <img src="/icons/google-map.png" />
              </a>
              <a href="https://nshn.ir/sbgFf-yjgNWF">
                <img src="/icons/neshan.webp" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
