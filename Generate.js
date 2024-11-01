const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

const ATTRIBUTES_PATH = path.join(__dirname, 'attributes');
const OUTPUT_PATH = path.join(__dirname, 'output');
const IMAGES_PATH = path.join(OUTPUT_PATH, 'images');
const METADATA_PATH = path.join(OUTPUT_PATH, 'metadata');
const MAX_NFTS = 1000; // Define the limit for the number of NFTs to generate

// Log the paths being used
console.log('Attributes Path:', ATTRIBUTES_PATH);
console.log('Output Path:', OUTPUT_PATH);
console.log('Images Path:', IMAGES_PATH);
console.log('Metadata Path:', METADATA_PATH);

// Create directories if they don't exist
if (!fs.existsSync(OUTPUT_PATH)) fs.mkdirSync(OUTPUT_PATH);
if (!fs.existsSync(IMAGES_PATH)) fs.mkdirSync(IMAGES_PATH);
if (!fs.existsSync(METADATA_PATH)) fs.mkdirSync(METADATA_PATH);

// Function to load images from a folder
const loadImages = async (folderPath) => {
    const files = fs.readdirSync(folderPath);
    const images = {};
    for (const file of files) {
        const key = path.basename(file, path.extname(file));
        images[key] = await loadImage(path.join(folderPath, file));
    }
    return images;
};

// Load all attribute layers
const loadAllAttributes = async () => {
    const backgrounds = await loadImages(path.join(ATTRIBUTES_PATH, 'Background'));
    const bodies = await loadImages(path.join(ATTRIBUTES_PATH, 'Body'));
    // const headwears = await loadImages(path.join(ATTRIBUTES_PATH, 'Headwear'));
    const outfits = await loadImages(path.join(ATTRIBUTES_PATH, 'Outfit'));
    const eyes = await loadImages(path.join(ATTRIBUTES_PATH, 'Eye'));
    const mouths = await loadImages(path.join(ATTRIBUTES_PATH, 'Mouth'));

    return { backgrounds, bodies, outfits, eyes, mouths };
};

// Function to get all combinations of attributes
const getAllCombinations = (attributes) => {
    const { backgrounds, bodies, outfits, eyes, mouths } = attributes;
    const combinations = [];

    for (const bgKey in backgrounds) {
        for (const bodyKey in bodies) {
            for (const tsKey in outfits) {
                for (const eyeKey in eyes) {
                    for (const mouthKey in mouths) {
                        combinations.push({
                            background: backgrounds[bgKey],
                            body: bodies[bodyKey],
                            outfit: outfits[tsKey],
                            eye: eyes[eyeKey],
                            mouth: mouths[mouthKey]
                        });
                    }
                }
            }
        }
    }


    return combinations;
};

// Function to shuffle and slice combinations to get a limited number
const getLimitedCombinations = (combinations, limit) => {
    // Shuffle array
    for (let i = combinations.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combinations[i], combinations[j]] = [combinations[j], combinations[i]];
    }
    // Return limited array
    return combinations.slice(0, limit);
};

// Function to generate an NFT
const generateNFT = async (combination, idx) => {
    const canvas = createCanvas(1000, 1000); // Adjust the canvas size as needed
    const ctx = canvas.getContext('2d');

    // Draw the layers in order
    ctx.drawImage(combination.background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(combination.body, 0, 0, canvas.width, canvas.height);
    // ctx.drawImage(combination.headwear, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(combination.outfit, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(combination.eye, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(combination.mouth, 0, 0, canvas.width, canvas.height);

    // Save the image
    const buffer = canvas.toBuffer('image/png');
    const imagePath = path.join(IMAGES_PATH, `${idx}.png`);
    fs.writeFileSync(imagePath, buffer);

    // Create metadata
    const metadata = {
        name: `name #${idx}`,
        format: "CHIP-0007",
        attributes: [
            {
                trait_type: "Background",
                value: path.basename(combination.background.src, path.extname(combination.background.src))
            },
            {
                trait_type: "Base",
                value: path.basename(combination.body.src, path.extname(combination.body.src))
            },
            {
                trait_type: "Outfit",
                value: path.basename(combination.outfit.src, path.extname(combination.outfit.src))
            },
            {
                trait_type: "Eye",
                value: path.basename(combination.eye.src, path.extname(combination.eye.src))
            },
            {
                trait_type: "Mouth",
                value: path.basename(combination.mouth.src, path.extname(combination.mouth.src))
            }
        ],
        collection: {

            "name": "collection name",
            "id": "id",
            "attributes": [
                {
                    "type": "description",
                    "value": "description"
                },
                {
                    "type": "icon",
                    "value": "icon image link"
                },
                {
                    "type": "banner",
                    "value": "banner image link"
                },
                {
                    "type": "twitter",
                    "value": "twitter link"
                },
                {
                    "type": "Website",
                    "value": "website url"
                },
            ]
        },
        "description": "Desc",
        "minting_tool": "minting tool",
        "sensitive_content": false,
    };

    // Save the metadata
    const metadataPath = path.join(METADATA_PATH, `${idx}.json`);
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 4));

    // Log the creation of the NFT
    console.log(`NFT #${idx} created`);
};

// Generate NFTs
const generateAllNFTs = async () => {
    const attributes = await loadAllAttributes();
    const allCombinations = getAllCombinations(attributes);
    const limitedCombinations = getLimitedCombinations(allCombinations, MAX_NFTS);

    for (let idx = 0; idx < limitedCombinations.length; idx++) {
        await generateNFT(limitedCombinations[idx], idx + 1);
    }

    console.log('NFTs and metadata generated successfully.');
};

generateAllNFTs();
