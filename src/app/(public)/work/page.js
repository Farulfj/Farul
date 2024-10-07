"use client";
import { useState, useEffect } from 'react';

const ItemCard = ({ label, value }) => {
    return (
        <div className='flex gap-4 bg-white rounded-md m-2 p-2'>
            <div>{label}</div>
            <div>{value}</div>
        </div>
    );
}

export default function AdminWork() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    async function onLoadData() {
        try {
            const res = await fetch('/api/contact');
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        onLoadData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="max-w-lg mx-auto bg-transparent p-6 rounded-lg shadow-md">

                <h1 className="text-xl font-semibold mb-4">Add experience</h1>
                <p className="text-sm text-gray-500 mb-4">* Indicates required</p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-semibold">Notify network</p>
                            <p className="text-xs text-gray-500">Turn on to notify your network of key profile changes (such as new job) and work anniversaries. Updates can take up to 2 hours. Learn more about <a href="#" className="text-blue-600">sharing profile changes</a>.</p>
                        </div>
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Title*</label>
                        <input type="text" placeholder="Ex: Retail Sales Manager" className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Employment type</label>
                        <select className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500">
                            <option>Please select</option>
                        </select>
                        <p className="text-xs text-blue-600 mt-1">Learn more about <a href="#" className="text-blue-600">employment types</a>.</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Company name*</label>
                        <input type="text" placeholder="Ex: Microsoft" className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Location</label>
                        <input type="text" placeholder="Ex: London, United Kingdom" className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Location type</label>
                        <select className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500">
                            <option>Please select</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Pick a location type (ex: remote)</p>
                    </div>

                    <div className="mb-4 flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <label className="text-sm">I am currently working in this role</label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Start date*</label>
                        <input type="text" placeholder="Start date*" className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">End date*</label>
                        <input type="text" placeholder="Present" className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500" disabled />
                    </div>

                    <div className="mb-6 flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <label className="text-sm">End current position as of now - Frontend Developer at Mister Aladin</label>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">Save</button>
                </form>
            </div>
        </>
    );
}
