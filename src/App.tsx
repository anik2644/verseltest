import React, { useState } from "react";
import { Button, Modal, Select, Input, Spin, message } from "antd";
import axios from "axios";

const sampleSentences = [
  "বিকাশ দিয়ে বিদ্যুৎ বিল পরিশোধ করা যাবে কি?",
  "নগদ এর মাধ্যমে বিদ্যুৎ বিল দিতে চাই ।",
  "বিপিডিবি বিল জমা দিয়েছি, কিন্তু সংযোগ চালু হয়নি ।",
  "ডেসকো বিল কি রকেট দিয়ে পরিশোধ করা যাবে?",
"পল্লী বিদ্যুৎ বিল বিকাশ থেকে পরিশোধ করেছি, কিন্তু কনফার্মেশন পাইনি।",
"রবি সিম দিয়ে মোবাইল রিচার্জ করতে চাই, কীভাবে করব?",
"গ্রামীণফোন অফারে কত মিনিট ফ্রি পাচ্ছি?",
"সোনালী ব্যাংকের ইন্টারনেট ব্যাংকিং কীভাবে চালু করব?",
"জনতা ব্যাংকে নতুন অ্যাকাউন্ট খোলার জন্য কী কী ডকুমেন্ট লাগবে?",
"দারাজ থেকে পণ্য অর্ডার করেছি, কিন্তু এখনো পাইনি।",
"ডাচ্-বাংলা ব্যাংকের ফাস্ট ট্র্যাক সার্ভিস কোথায় পাওয়া যাবে?",
"ইসলামী ব্যাংকের ডেবিট কার্ড দিয়ে অনলাইনে কেনাকাটা করা যাবে কি?",
"এয়ারটেল সিমে নতুন অফার কী কী আছে?",

];

const ParaphraseApp: React.FC = () => {
  const [inputSentence, setInputSentence] = useState("");
  const [paraphrases, setParaphrases] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!inputSentence.trim()) {
      message.warning("Please enter or select a sentence!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/paraphrase/", {
        sentence: inputSentence,
      });

      setParaphrases(response.data.paraphrases);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching paraphrases:", error);
      message.error("Failed to fetch paraphrases. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-gradient-to-r from-blue-500 to-white p-8 rounded-2xl shadow-xl w-96 text-center">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Sentence Paraphraser</h1>

        {/* Input and select container */}
        <div className="mb-6 space-y-4">
          {/* <Select
            className="w-full"
            placeholder="Select a sentence"
            onChange={setInputSentence}
            value={inputSentence || undefined}
            style={{ fontSize: "100px", height: "50px" }} // Increased font size and height

          >
            {sampleSentences.map((sentence, index) => (
              <Select.Option key={index} value={sentence}>
                {sentence}
              </Select.Option>
            ))}
          </Select> */}
<Select
  className="w-full"
  placeholder="Select a sentence"
  onChange={setInputSentence}
  value={inputSentence || undefined}
  style={{ fontSize: "20px", height: "60px" }} // Increased font size and height
>
  {sampleSentences.map((sentence, index) => (
    <Select.Option key={index} value={sentence} style={{ fontSize: "20px" }}>
      {sentence}
    </Select.Option>
  ))}
</Select>
<Input.TextArea
  className="w-full"
  placeholder="Or enter your own sentence"
  value={inputSentence}
  onChange={(e) => setInputSentence(e.target.value)}
  rows={4}
  style={{ fontSize: "20px" }} // Increased font size
/>
        </div>

        {/* Submit Button */}
        <Button
          type="primary"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 w-full"
          disabled={loading}
        >
          {loading ? <Spin /> : "Paraphrase"}
        </Button>

        {/* Modal */}
        <Modal
  title={<span style={{ fontSize: "22px", fontWeight: "bold" }}>Paraphrased Sentences</span>}
  open={isModalOpen}
  onCancel={() => setIsModalOpen(false)}
  footer={null}
>
  <ul className="list-disc pl-5 text-gray-800" style={{ fontSize: "20px" }}>
    {paraphrases.map((paraphrase, index) => (
      <li key={index} className="mb-2">{paraphrase}</li>
    ))}
  </ul>
</Modal>
      </div>
    </div>
  );
};

export default ParaphraseApp;
