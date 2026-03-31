export async function register(req, res) {
  try {
    const user = req.body;
    // Simulate user registration logic (e.g., save to database)
    res
      .status(201)
      .json({ message: "User registered successfully", user: user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
