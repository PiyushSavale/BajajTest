const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.post("/bfhl", (req, res) => {
    const { data } = req.body;
    if (!Array.isArray(data)) {
        return res
            .status(400)
            .json({ is_success: false, message: "Invalid input" });
    }

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter(
        (item) => isNaN(item) && isNaN(item.charAt(0)),
    );

    const lowercaseAlphabets = alphabets.filter(
        (item) => item === item.toLowerCase(),
    );
    const highestLowercaseAlphabet =
        lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

    res.json({
        is_success: true,
        user_id: "your_name_ddmmyyyy",
        email: "your_email@example.com",
        roll_number: "your_roll_number",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
