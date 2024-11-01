Chia Blockchain
This project is a Node.js-based NFT Generator for creating NFTs with metadata specifically for the Chia blockchain. The generator allows you to combine a background, body, and other attributes to create unique NFTs, then outputs the generated images and metadata. This tool uses the canvas, fs, and path packages for image generation, file management, and path handling.

Features
Automated Image Generation: Generate a specified number of NFTs by combining various layers, such as backgrounds, bodies, and attributes.
Metadata Creation: Generates metadata JSON files for each NFT.
Easy Setup and Execution: Run the generator script with Node.js to instantly create NFTs.
Prerequisites
Ensure you have Node.js and npm installed on your machine. You can download them from Node.js official website.

Installation
Clone this repository:

bash
Copy code
git clone https://github.com/your-username/nft-generator-chia.git
cd nft-generator-chia
Install dependencies:

bash
Copy code
npm install
This will install the following packages:

canvas: Used to render images with layers.
fs: Used to read and write files, including generated NFTs and metadata.
path: Provides utilities for handling and transforming file paths.
Usage
Organize your layer assets:

Prepare the images for backgrounds, bodies, and attributes, and organize them in folders within your project directory.
Configure the generator script (Generator.js):

Set up the number of NFTs you want to create and specify paths to the assets for backgrounds, bodies, and other attributes.
Customize any additional options (e.g., NFT dimensions, layers) if needed.
Run the generator:

bash
Copy code
node Generator.js
The generator will:

Create unique NFTs by combining the layers.
Generate metadata for each NFT with details such as attributes and rarity.
Output:

Check the output directory (or a specified directory in your configuration) for the generated NFT images and metadata files.
Project Structure
javascript
Copy code
nft-generator-chia/
├── assets/
│   ├── backgrounds/
│   ├── bodies/
│   └── attributes/
├── output/
│   ├── images/
│   └── metadata/
├── Generator.js
└── README.md
Example Configuration
In Generator.js, you can configure the number of NFTs to generate and other settings:

javascript
Copy code
const numberOfNFTs = 100; // Specify how many NFTs you want to generate
Dependencies
canvas: Used for image creation.
fs: Handles file operations.
path: Manages file paths.
Install these dependencies using:

bash
Copy code
npm install canvas fs path
License
This project is open-source and available under the MIT License.

Contributions
Contributions, issues, and feature requests are welcome! Feel free to check out the issues page if you want to contribute.

Acknowledgments
This generator is inspired by the need to create batch NFTs efficiently for blockchain projects, specifically tailored for the Chia blockchain.
