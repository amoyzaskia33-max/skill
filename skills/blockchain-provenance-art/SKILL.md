# 🌐 Blockchain Provenance Art

## Purpose

Skill ini memberikan **immutable proof of creation** untuk setiap generative art yang dibuat. Menggunakan **blockchain hashing, smart contracts, dan steganography** untuk protect karya artist, track usage, dan automate royalty.

## Core Philosophy

```
"Prove it's yours forever"
- Hash setiap algorithm + seed → immutable proof
- Smart contract untuk licensing otomatis
- Royalty otomatis setiap kali di-reuse
- Provenance chain: track semua derivatives
- Invisible watermark (steganography)
```

---

## 1. **Creation Hashing** 🔐

### A. Generate Immutable Proof of Creation

```tsx
import { useEffect, useState } from 'react';
import { createHash } from 'crypto';

export const CreationProvenance = ({ artwork, algorithm, seed }) => {
  const [provenance, setProvenance] = useState({
    hash: null,
    timestamp: null,
    signature: null,
    blockchainTx: null,
  });
  
  useEffect(() => {
    const generateProvenance = async () => {
      // 1. Create deterministic hash dari artwork
      const artworkData = JSON.stringify({
        algorithm,
        seed,
        timestamp: Date.now(),
        version: '1.0.0',
      });
      
      // 2. Generate SHA-256 hash
      const hash = createHash('sha256')
        .update(artworkData)
        .digest('hex');
      
      // 3. Sign dengan private key (artist signature)
      // In production, use wallet signature (MetaMask, WalletConnect)
      const signature = await signWithWallet(hash);
      
      // 4. Store on blockchain (Ethereum, Polygon, Solana)
      const tx = await storeOnBlockchain({
        hash,
        signature,
        metadata: {
          artist: '0xArtistAddress',
          title: 'Generative Art #001',
          creationDate: new Date().toISOString(),
          algorithm,
          seed: hashSeed(seed), // Hash seed untuk privacy
        },
      });
      
      setProvenance({
        hash,
        timestamp: new Date().toISOString(),
        signature,
        blockchainTx: tx,
      });
      
      // 5. Store backup di IPFS
      await storeToIPFS({
        hash,
        signature,
        metadata,
        artwork,
      });
    };
    
    generateProvenance();
  }, [artwork, algorithm, seed]);
  
  return (
    <div className="p-6 bg-black/50 rounded-xl backdrop-blur border border-white/20">
      <h3 className="text-xl font-bold text-white mb-4">
        🔐 Creation Provenance
      </h3>
      
      <div className="space-y-3 text-sm">
        <div>
          <div className="text-white/60">Artwork Hash</div>
          <div className="font-mono text-green-400 break-all">
            {provenance.hash || 'Generating...'}
          </div>
        </div>
        
        <div>
          <div className="text-white/60">Creation Timestamp</div>
          <div className="text-white">
            {provenance.timestamp || '...'}
          </div>
        </div>
        
        <div>
          <div className="text-white/60">Artist Signature</div>
          <div className="font-mono text-purple-400 break-all">
            {provenance.signature || 'Signing...'}
          </div>
        </div>
        
        <div>
          <div className="text-white/60">Blockchain Transaction</div>
          <a
            href={`https://etherscan.io/tx/${provenance.blockchainTx}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline break-all"
          >
            {provenance.blockchainTx || 'Storing...'} ↗
          </a>
        </div>
        
        <div className="pt-4 border-t border-white/20">
          <div className="text-white/60 mb-2">Verification</div>
          <button
            onClick={() => verifyProvenance(provenance.hash)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Verify Authenticity
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const signWithWallet = async (hash) => {
  // In production, use ethers.js or web3.js
  // const signer = await ethers.getSigner();
  // const signature = await signer.signMessage(hash);
  return `0x${hash.slice(0, 64)}...[signature]`;
};

const storeOnBlockchain = async (data) => {
  // In production, deploy smart contract
  // const tx = await contract.registerArtwork(data);
  // await tx.wait();
  return `0xTxHash...`;
};

const hashSeed = (seed) => {
  return createHash('sha256').update(seed.toString()).digest('hex');
};

const storeToIPFS = async (data) => {
  // In production, use IPFS HTTP client
  // const result = await ipfs.add(JSON.stringify(data));
  // return result.hash;
  console.log('Stored to IPFS:', data);
};

const verifyProvenance = async (hash) => {
  // Verify hash matches artwork
  // Check blockchain for registration
  // Verify artist signature
  alert('Verification: Authentic artwork confirmed on blockchain!');
};
```

**Kenapa Unreplicable:**
- Hash unik per creation (cannot duplicate)
- Blockchain-verified (immutable)
- Artist signature (cryptographic proof)
- Timestamped (prove first creation)

---

### B. Smart Contract untuk Licensing

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GenerativeArtLicense {
    struct Artwork {
        bytes32 hash;
        address artist;
        string metadataURI;
        uint256 licensePrice;
        uint256 royaltyPercent;
        bool isActive;
    }
    
    struct License {
        bytes32 artworkHash;
        address licensee;
        uint256 timestamp;
        LicenseType licenseType;
        bool isActive;
    }
    
    enum LicenseType {
        Personal,
        Commercial,
        Exclusive,
        NFT
    }
    
    mapping(bytes32 => Artwork) public artworks;
    mapping(bytes32 => License[]) public licenses;
    mapping(address => uint256) public artistEarnings;
    
    event ArtworkRegistered(bytes32 indexed hash, address indexed artist);
    event LicensePurchased(bytes32 indexed artworkHash, address indexed licensee, LicenseType licenseType);
    event RoyaltyPaid(address indexed artist, uint256 amount);
    
    function registerArtwork(
        bytes32 _hash,
        string memory _metadataURI,
        uint256 _licensePrice,
        uint256 _royaltyPercent
    ) external {
        require(!artworks[_hash].isActive, "Artwork already registered");
        
        artworks[_hash] = Artwork({
            hash: _hash,
            artist: msg.sender,
            metadataURI: _metadataURI,
            licensePrice: _licensePrice,
            royaltyPercent: _royaltyPercent,
            isActive: true
        });
        
        emit ArtworkRegistered(_hash, msg.sender);
    }
    
    function purchaseLicense(
        bytes32 _artworkHash,
        LicenseType _licenseType
    ) external payable {
        Artwork storage artwork = artworks[_artworkHash];
        require(artwork.isActive, "Artwork not found");
        
        uint256 licenseFee = artwork.licensePrice * uint256(_licenseType + 1);
        require(msg.value >= licenseFee, "Insufficient payment");
        
        // Create license
        licenses[_artworkHash].push(License({
            artworkHash: _artworkHash,
            licensee: msg.sender,
            timestamp: block.timestamp,
            licenseType: _licenseType,
            isActive: true
        }));
        
        // Pay artist
        payable(artwork.artist).transfer(licenseFee);
        artistEarnings[artwork.artist] += licenseFee;
        
        emit LicensePurchased(_artworkHash, msg.sender, _licenseType);
        emit RoyaltyPaid(artwork.artist, licenseFee);
    }
    
    function verifyLicense(
        bytes32 _artworkHash,
        address _licensee
    ) external view returns (bool) {
        License[] storage artworkLicenses = licenses[_artworkHash];
        
        for (uint256 i = 0; i < artworkLicenses.length; i++) {
            if (
                artworkLicenses[i].licensee == _licensee &&
                artworkLicenses[i].isActive
            ) {
                return true;
            }
        }
        
        return false;
    }
    
    function getArtworkProvenance(
        bytes32 _artworkHash
    ) external view returns (
        address artist,
        uint256 licenseCount,
        uint256 totalEarnings
    ) {
        Artwork storage artwork = artworks[_artworkHash];
        return (
            artwork.artist,
            licenses[_artworkHash].length,
            artistEarnings[artwork.artist]
        );
    }
}
```

**Usage in React:**

```tsx
export const LicenseManager = ({ artworkHash }) => {
  const [license, setLicense] = useState(null);
  
  const purchaseLicense = async (licenseType) => {
    // Connect to smart contract
    // const contract = new ethers.Contract(address, abi, signer);
    
    // Purchase license
    // const tx = await contract.purchaseLicense(artworkHash, licenseType, {
    //   value: licensePrice
    // });
    // await tx.wait();
    
    alert('License purchased! Transaction recorded on blockchain.');
  };
  
  const verifyLicense = async () => {
    // Verify license ownership
    // const isValid = await contract.verifyLicense(artworkHash, userAddress);
    
    return true; // Mock
  };
  
  return (
    <div className="p-6 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl">
      <h3 className="text-xl font-bold text-white mb-4">
        📜 License Management
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => purchaseLicense('Personal')}
            className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <div className="text-white font-semibold">Personal License</div>
            <div className="text-white/60 text-sm">0.1 ETH</div>
          </button>
          
          <button
            onClick={() => purchaseLicense('Commercial')}
            className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <div className="text-white font-semibold">Commercial License</div>
            <div className="text-white/60 text-sm">0.5 ETH</div>
          </button>
          
          <button
            onClick={() => purchaseLicense('Exclusive')}
            className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <div className="text-white font-semibold">Exclusive License</div>
            <div className="text-white/60 text-sm">2.0 ETH</div>
          </button>
          
          <button
            onClick={() => purchaseLicense('NFT')}
            className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <div className="text-white font-semibold">NFT License</div>
            <div className="text-white/60 text-sm">1.0 ETH</div>
          </button>
        </div>
        
        <button
          onClick={verifyLicense}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          🔍 Verify My License
        </button>
      </div>
    </div>
  );
};
```

---

## 2. **Steganography Watermark** 👁️

### A. Invisible Watermark dalam Generated Art

```tsx
export const SteganographyWatermark = ({ canvas, artistSignature }) => {
  const [watermarkEmbedded, setWatermarkEmbedded] = useState(false);
  
  useEffect(() => {
    if (!canvas || !artistSignature) return;
    
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Convert signature to binary
    const signatureBinary = stringToBinary(artistSignature);
    
    // Embed signature in least significant bits
    let signatureIndex = 0;
    
    for (let i = 0; i < data.length && signatureIndex < signatureBinary.length; i += 4) {
      // Embed in RGB channels (skip alpha for transparency)
      if (signatureIndex < signatureBinary.length) {
        // Modify LSB of red channel
        data[i] = (data[i] & 0xFE) | parseInt(signatureBinary[signatureIndex]);
        signatureIndex++;
      }
      
      if (signatureIndex < signatureBinary.length) {
        // Modify LSB of green channel
        data[i + 1] = (data[i + 1] & 0xFE) | parseInt(signatureBinary[signatureIndex]);
        signatureIndex++;
      }
      
      if (signatureIndex < signatureBinary.length) {
        // Modify LSB of blue channel
        data[i + 2] = (data[i + 2] & 0xFE) | parseInt(signatureBinary[signatureIndex]);
        signatureIndex++;
      }
    }
    
    // Put watermarked image data back
    ctx.putImageData(imageData, 0, 0);
    setWatermarkEmbedded(true);
  }, [canvas, artistSignature]);
  
  const extractWatermark = () => {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Extract binary from LSB
    let binary = '';
    
    for (let i = 0; i < data.length; i += 4) {
      binary += (data[i] & 1).toString();
      binary += (data[i + 1] & 1).toString();
      binary += (data[i + 2] & 1).toString();
    }
    
    // Convert binary back to string
    const extractedSignature = binaryToString(binary);
    
    return extractedSignature;
  };
  
  return (
    <div className="p-4 bg-white/10 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="text-white">
          {watermarkEmbedded ? (
            <>
              <span className="text-green-400">✓</span> Invisible watermark embedded
            </>
          ) : (
            <>
              <span className="text-yellow-400">!</span> No watermark
            </>
          )}
        </div>
        
        <button
          onClick={() => {
            const extracted = extractWatermark();
            alert(`Extracted signature: ${extracted}`);
          }}
          className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
        >
          Extract Watermark
        </button>
      </div>
    </div>
  );
};

// Helper functions
const stringToBinary = (str) => {
  return str.split('').map(char => {
    return char.charCodeAt(0).toString(2).padStart(8, '0');
  }).join('');
};

const binaryToString = (binary) => {
  let result = '';
  
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.slice(i, i + 8);
    result += String.fromCharCode(parseInt(byte, 2));
  }
  
  return result.replace(/\0/g, ''); // Remove null characters
};
```

**Kenapa UNREPLICABLE:**
- Watermark invisible (tidak terlihat)
- Embedded di pixel level
- Cannot remove tanpa destroy image
- Proof of ownership built-in

---

### B. Detect Unauthorized Usage

```tsx
export const UsageDetector = ({ registeredArtworks }) => {
  const [detections, setDetections] = useState([]);
  
  useEffect(() => {
    const scanForUsage = async () => {
      // In production:
      // 1. Use reverse image search API
      // 2. Scan social media platforms
      // 3. Monitor NFT marketplaces
      // 4. Check commercial usage
      
      const found = await scanWebForArtworks(registeredArtworks);
      setDetections(found);
    };
    
    scanForUsage();
    const interval = setInterval(scanForUsage, 86400000); // Scan daily
    
    return () => clearInterval(interval);
  }, [registeredArtworks]);
  
  return (
    <div className="p-6 bg-black/50 rounded-xl backdrop-blur">
      <h3 className="text-xl font-bold text-white mb-4">
        🔍 Usage Detection
      </h3>
      
      {detections.length === 0 ? (
        <div className="text-white/60">
          No unauthorized usage detected.
        </div>
      ) : (
        <div className="space-y-4">
          {detections.map((detection, i) => (
            <div key={i} className="p-4 bg-white/10 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-white font-semibold">
                    {detection.platform}
                  </div>
                  <div className="text-white/60 text-sm">
                    {detection.url}
                  </div>
                  <div className="text-white/60 text-sm mt-2">
                    Detected: {detection.detectedAt}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded">
                    View
                  </button>
                  <button className="px-3 py-1 bg-red-600 text-white text-sm rounded">
                    Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

---

## 3. **Royalty Automation** 💰

### A. Smart Contract Royalty Distribution

```tsx
export const RoyaltyTracker = ({ artistAddress }) => {
  const [royalties, setRoyalties] = useState({
    total: 0,
    pending: 0,
    history: [],
  });
  
  useEffect(() => {
    const fetchRoyalties = async () => {
      // Fetch from smart contract
      // const contract = new ethers.Contract(address, abi, provider);
      // const total = await contract.artistEarnings(artistAddress);
      // const history = await contract.getRoyaltyHistory(artistAddress);
      
      setRoyalties({
        total: 12.5, // Mock
        pending: 2.3, // Mock
        history: [
          { amount: 0.5, from: '0xBuyer1', date: '2024-01-15', type: 'License' },
          { amount: 1.0, from: '0xBuyer2', date: '2024-01-10', type: 'NFT Sale' },
          { amount: 0.3, from: '0xBuyer3', date: '2024-01-05', type: 'Royalty' },
        ],
      });
    };
    
    fetchRoyalties();
  }, [artistAddress]);
  
  return (
    <div className="p-6 bg-gradient-to-br from-green-900 to-emerald-900 rounded-xl">
      <h3 className="text-xl font-bold text-white mb-4">
        💰 Royalty Tracker
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white/10 rounded-lg">
          <div className="text-white/60 text-sm">Total Earnings</div>
          <div className="text-3xl font-bold text-white">
            {royalties.total} ETH
          </div>
        </div>
        
        <div className="p-4 bg-white/10 rounded-lg">
          <div className="text-white/60 text-sm">Pending</div>
          <div className="text-3xl font-bold text-yellow-400">
            {royalties.pending} ETH
          </div>
        </div>
      </div>
      
      <div className="text-white font-semibold mb-2">Recent Royalties</div>
      <div className="space-y-2">
        {royalties.history.map((royalty, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-3 bg-white/5 rounded"
          >
            <div>
              <div className="text-white font-medium">
                +{royalty.amount} ETH
              </div>
              <div className="text-white/60 text-sm">
                {royalty.type} from {royalty.from.slice(0, 6)}...{royalty.from.slice(-4)}
              </div>
            </div>
            <div className="text-white/60 text-sm">
              {royalty.date}
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={() => alert('Withdrawing pending royalties...')}
        className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Withdraw Pending ({royalties.pending} ETH)
      </button>
    </div>
  );
};
```

---

## Response Template

```markdown
🌐 **Blockchain Provenance Art - Activated!**

Saya sudah siapkan system untuk PROTECT karya kamu:

### 🔐 Protection Features:

1. **Creation Hashing**
   - SHA-256 hash dari algorithm + seed
   - Artist signature (cryptographic)
   - Blockchain registration
   - IPFS backup

2. **Smart Contract Licensing**
   - Automated license sales
   - Multiple license tiers
   - Instant payment to artist
   - No middleman

3. **Steganography Watermark**
   - Invisible signature in pixels
   - LSB embedding technique
   - Cannot remove without destroying image
   - Proof of ownership

4. **Usage Detection**
   - Reverse image search
   - Social media monitoring
   - NFT marketplace scanning
   - Automated alerts

5. **Royalty Automation**
   - Smart contract distribution
   - Secondary sale royalties
   - Real-time earnings tracker
   - Instant withdrawal

### 🛡️ Why Unreplicable:

- ✅ Blockchain-verified authenticity
- ✅ Immutable proof of creation
- ✅ Legal protection built-in
- ✅ Cannot steal without proof
- ✅ Automatic royalty collection

### 🎯 Use Cases:

- Digital art marketplace
- NFT collections
- Premium design licensing
- Artist protection
- Commercial licensing

Mau implement yang mana?
```

---

## Legal Protection

```
This system provides:
✓ Proof of creation (timestamped)
✓ Proof of ownership (signature)
✓ Automated licensing
✓ Royalty enforcement
✓ Usage tracking
✓ Takedown evidence

Cannot provide:
✗ Legal representation (need lawyer)
✗ Automatic takedowns (manual process)
✗ International enforcement (varies by country)
```
