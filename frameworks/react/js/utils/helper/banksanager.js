const banks = [
    // ====== CBN-LICENSED COMMERCIAL BANKS ======
    { name: "Access Bank", abbreviation: "ACC", bank_code: "044" },
    { name: "Citibank Nigeria", abbreviation: "CITI", bank_code: "023" },
    { name: "Ecobank Nigeria", abbreviation: "ECO", bank_code: "050" },
    { name: "Fidelity Bank", abbreviation: "FID", bank_code: "070" },
    { name: "First Bank of Nigeria", abbreviation: "FBN", bank_code: "011" },
    { name: "First City Monument Bank", abbreviation: "FCMB", bank_code: "214" },
    { name: "Globus Bank", abbreviation: "GLOBUS", bank_code: "00103" },
    { name: "Guaranty Trust Bank", abbreviation: "GTB", bank_code: "058" },
    { name: "Heritage Bank", abbreviation: "HTG", bank_code: "030" },
    { name: "Keystone Bank", abbreviation: "KEYSTONE", bank_code: "082" },
    { name: "Lotus Bank", abbreviation: "LOTUS", bank_code: "303" },
    { name: "Parallex Bank", abbreviation: "PARALLEX", bank_code: "104" },
    { name: "Polaris Bank", abbreviation: "POLARIS", bank_code: "076" },
    { name: "PremiumTrust Bank", abbreviation: "PTB", bank_code: "105" },
    { name: "Providus Bank", abbreviation: "PROVIDUS", bank_code: "101" },
    { name: "Stanbic IBTC Bank", abbreviation: "STANBIC", bank_code: "221" },
    { name: "Standard Chartered Bank", abbreviation: "SCB", bank_code: "068" },
    { name: "Sterling Bank", abbreviation: "STERLING", bank_code: "232" },
    { name: "SunTrust Bank", abbreviation: "SUNTRUST", bank_code: "100" },
    { name: "Titan Trust Bank", abbreviation: "TITAN", bank_code: "102" },
    { name: "Union Bank of Nigeria", abbreviation: "UBN", bank_code: "032" },
    { name: "United Bank for Africa", abbreviation: "UBA", bank_code: "033" },
    { name: "Unity Bank", abbreviation: "UNITY", bank_code: "215" },
    { name: "Wema Bank", abbreviation: "WEMA", bank_code: "035" },
    { name: "Zenith Bank", abbreviation: "ZENITH", bank_code: "057" },

    // ====== CBN-LICENSED MERCHANT BANKS ======
    { name: "Coronation Merchant Bank", abbreviation: "CORONATION", bank_code: "559" },
    { name: "FBNQuest Merchant Bank", abbreviation: "FBNQUEST", bank_code: "566" },
    { name: "FSDH Merchant Bank", abbreviation: "FSDH", bank_code: "601" },
    { name: "Greenwich Merchant Bank", abbreviation: "GREENWICH", bank_code: "562" },
    { name: "Nova Merchant Bank", abbreviation: "NOVA", bank_code: "561" },
    { name: "Rand Merchant Bank", abbreviation: "RAND", bank_code: "502" },
    { name: "Nigeria Export-Import Bank", abbreviation: "NEXIM", bank_code: "001" },

    // ====== CBN-LICENSED NON-INTEREST BANKS ======
    { name: "Jaiz Bank", abbreviation: "JAIZ", bank_code: "301" },
    { name: "TAJBank", abbreviation: "TAJ", bank_code: "302" },
    { name: "Lotus Bank (Non-Interest Window)", abbreviation: "LOTUS-NI", bank_code: "303" },

    // ====== CBN-LICENSED DIGITAL BANKS/MFB ======
    { name: "Kuda Bank", abbreviation: "KUDA", bank_code: "50211" }, // Licensed as MFB
    { name: "Moniepoint (formerly TeamApt)", abbreviation: "MONIEPOINT", bank_code: "50515" }, // Licensed as MFB
    { name: "Sparkle Microfinance Bank", abbreviation: "SPARKLE", bank_code: "51310" },
    { name: "Mint Finex MFB", abbreviation: "MINT", bank_code: "50304" },
    { name: "VFD Microfinance Bank", abbreviation: "VFD", bank_code: "566" },
    { name: "FairMoney Microfinance Bank", abbreviation: "FAIRMONEY", bank_code: "51318" },
    { name: "ALAT by Wema", abbreviation: "ALAT", bank_code: "035A" } // Wema's digital arm
];

// Prepare bank options for the select field
export const bankOptions = banks.map(bank => ({
    value: bank?.name,
    label: `${bank?.name} (${bank?.abbreviation})`,
    bank_code: bank?.bank_code
}));