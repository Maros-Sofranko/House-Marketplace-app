import React from 'react';
import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Spinner from '../components/Spinner';

function CreateListing() {
    const [geolocationEnabled, setGeolocationEnabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: "",
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude: 0,
        longitude: 0
    })

    const { type, name, bedrooms, bathrooms, parking, furnished, address, offer, regularPrice, discountedPrice, images, latitude, longitude } = formData;

    const auth = getAuth();
    const navigate = useNavigate();
    const isMounted = useRef(true);

    useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFormData({ ...formData, useRef: user.uid });
                } else {
                    navigate("/sign-in");
                }
            })
        }

        return () => {
            isMounted.current = false;
        }

    }, [isMounted])

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    const onMutate = (e) => {
        let boolean = null;

        if (e.target.value === "true") {
            boolean = true;
        }

        if (e.target.value === "false") {
            boolean = false;
        }

        // Files
        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files
            }));
        }

        // Text, Booleans, Numbers
        if (!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value
            }));
        }
    }

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className='profile'>
            <header>
                <p className="pageHeader">Create a Listing</p>
            </header>

            <main>
                <form onSubmit={onSubmit}>
                    <label className="formLabel">Sell / Rent</label>

                    {/* Buttons SELL AND RENT */}
                    <div className='formButtons'>
                        <button
                            type='button'
                            className={type === "sale" ? "formButtonActive" : "formButton"}
                            value="sale"
                            onClick={onMutate}
                            id="type"
                        >
                            Sell
                        </button>
                        <button
                            type='button'
                            className={type === "rent" ? "formButtonActive" : "formButton"}
                            value="rent"
                            onClick={onMutate}
                            id="type"
                        >
                            Rent
                        </button>
                    </div>

                    {/* NAME OF LISTINGS */}
                    <label className="formLabel">Name</label>
                    <input
                        className='formInputName'
                        type="text"
                        id="name"
                        onChange={onMutate}
                        value={name}
                        maxLength="32"
                        minLength="10"
                        required
                    />

                    {/* BEDROOMS AND BATHROOMS */}
                    <div className='formRooms flex'>
                        <div>
                            <label className="formLabel">Bedrooms</label>
                            <input
                                className='formInputSmall'
                                type="number"
                                id="bedrooms"
                                onChange={onMutate}
                                value={bedrooms}
                                maxLength="1"
                                minLength="50"
                                required
                            />
                        </div>
                        <div>
                            <label className="formLabel">Bathrooms</label>
                            <input
                                className='formInputSmall'
                                type="number"
                                id="bathrooms"
                                onChange={onMutate}
                                value={bathrooms}
                                maxLength="1"
                                minLength="50"
                                required
                            />
                        </div>
                    </div>

                    {/* PARKING SPOT */}
                    <label className="formLabel">Parking spot</label>
                    <div className='formButtons'>
                        <button
                            type='button'
                            className={parking ? "formButtonActive" : "formButton"}
                            value={true}
                            onClick={onMutate}
                            id="parking"
                            min="1"
                            max="50"
                        >
                            Yes
                        </button>
                        <button
                            type='button'
                            className={!parking && parking !== null ? "formButtonActive" : "formButton"}
                            value={false}
                            onClick={onMutate}
                            id="parking"
                            min="1"
                            max="50"
                        >
                            No
                        </button>
                    </div>

                    {/* FURNISHED */}
                    <label className="formLabel">Furnished</label>
                    <div className='formButtons'>
                        <button
                            type='button'
                            className={furnished ? "formButtonActive" : "formButton"}
                            value={true}
                            onClick={onMutate}
                            id="furnished"
                        >
                            Yes
                        </button>
                        <button
                            type='button'
                            className={!furnished && furnished !== null ? "formButtonActive" : "formButton"}
                            value={false}
                            onClick={onMutate}
                            id="furnished"
                        >
                            No
                        </button>
                    </div>

                    {/* ADDRESS */}
                    <label className="formLabel">Address</label>
                    <textarea
                        className='formInputAddress'
                        type="text"
                        id='address'
                        onChange={onMutate}
                        value={address}
                        required
                    />

                    {/* LONGITUDE AND LATITUDE */}
                    {!geolocationEnabled && (
                        <div className='formLatLng flex'>
                            <div>
                                <label className="formLabel">Latitude</label>
                                <input
                                    type="number"
                                    className='formInputSmall'
                                    id='latitude'
                                    value={latitude}
                                    onChange={onMutate}
                                    required
                                />
                            </div>
                            <div>
                                <label className="formLabel">Longitude</label>
                                <input
                                    type="number"
                                    className='formInputSmall'
                                    id='longitude'
                                    value={longitude}
                                    onChange={onMutate}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* OFFER */}
                    <label className="formLabel">Offer</label>
                    <div className='formButtons'>
                        <button
                            type='button'
                            className={offer ? "formButtonActive" : "formButton"}
                            value={true}
                            onClick={onMutate}
                            id="offer"
                        >
                            Yes
                        </button>
                        <button
                            type='button'
                            className={!offer && offer !== null ? "formButtonActive" : "formButton"}
                            value={false}
                            onClick={onMutate}
                            id="offer"
                        >
                            No
                        </button>
                    </div>

                    {/* REGULAR PRICE */}
                    <label className="formLabel">Regular price</label>
                    <div className="formPriceDiv">
                        <input
                            className='formInputSmall'
                            type="number"
                            id="regularPrice"
                            value={regularPrice}
                            onChange={onMutate}
                            min="50"
                            max="750000000"
                            required
                        />
                        {type === "rent" && <p className='formPriceText'>$ / Month</p>}
                    </div>

                    {/* DISCOUNTED PRICE */}
                    {offer && (
                        <>
                            <label className="formLabel">Discounted price</label>
                            <input
                                className='formInputSmall'
                                type="number"
                                id="discountedPrice"
                                value={discountedPrice}
                                onChange={onMutate}
                                min="50"
                                max="750000000"
                                required
                            />
                        </>
                    )}

                    {/* IMAGES */}
                    <label className="formLabel">Iamges</label>
                    <p className="imagesInfo">The first image will be the cover (max 6).</p>
                    <input
                        type="file"
                        id="images"
                        className='formInputFile'
                        onChange={onMutate}
                        max="6"
                        accept='.jpg,.png,.jpeg'
                        multiple
                        required
                    />

                    <button type="submit" className="primaryButton createListingButton">Create Listing</button>
                </form>
            </main>
        </div>
    );
}

export default CreateListing;
