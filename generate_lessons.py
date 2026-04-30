#!/usr/bin/env python3
"""Generate expanded lesson data for Thai Dai learn.html"""

lesson_data = {
    # Unit 1: Basics (Lessons 1-3)
    1: [
        {
            "question": 'What does "สวัสดี" mean?',
            "audio": "sawasdee",
            "correct": "hello",
            "options": [
                {"value": "hello", "thai": "สวัสดี", "romanized": "(sà-wàt-dii)", "icon": "👋", "note": "Low + high + mid tones"},
                {"value": "goodbye", "thai": "ลาก่อน", "romanized": "(laa-gàwn)", "icon": "🚶", "note": "Mid + falling tones"},
                {"value": "thank you", "thai": "ขอบคุณ", "romanized": "(khòp-khun)", "icon": "🙏", "note": "Low + mid tones"},
                {"value": "sorry", "thai": "ขอโทษ", "romanized": "(khǎaw-thôot)", "icon": "😔", "note": "Rising + falling tones"}
            ]
        },
        {
            "question": 'How do you say "Hello" politely (male speaker)?',
            "audio": "sawasdee krab",
            "correct": "sawasdee krab",
            "options": [
                {"value": "sawasdee krab", "thai": "สวัสดีครับ", "romanized": "(sà-wàt-dii kráp)", "icon": "🙋‍♂️", "note": "Male polite particle: kráp"},
                {"value": "sawasdee ka", "thai": "สวัสดีค่ะ", "romanized": "(sà-wàt-dii khà)", "icon": "🙋‍♀️", "note": "Female polite particle: khà (low tone)"},
                {"value": "sawasdee", "thai": "สวัสดี", "romanized": "(sà-wàt-dii)", "icon": "👋", "note": "Casual, no particle"},
                {"value": "sawasdee na", "thai": "สวัสดีนะ", "romanized": "(sà-wàt-dii ná)", "icon": "😊", "note": "Casual friendly: ná"}
            ]
        },
        {
            "question": 'How do you say "Hello" politely (female speaker)?',
            "audio": "sawasdee ka",
            "correct": "sawasdee ka",
            "options": [
                {"value": "sawasdee ka", "thai": "สวัสดีค่ะ", "romanized": "(sà-wàt-dii khà)", "icon": "🙋‍♀️", "note": "Female polite particle: khà (low tone)"},
                {"value": "sawasdee krab", "thai": "สวัสดีครับ", "romanized": "(sà-wàt-dii kráp)", "icon": "🙋‍♂️", "note": "Male polite particle: kráp"},
                {"value": "sawasdee", "thai": "สวัสดี", "romanized": "(sà-wàt-dii)", "icon": "👋", "note": "Casual, no particle"},
                {"value": "sawasdee jao", "thai": "สวัสดีเจ้า", "romanized": "(sà-wàt-dii jâo)", "icon": "🙏", "note": "Northern Thai style"}
            ]
        },
        {
            "question": 'What does "คุณ" mean?',
            "audio": "khun",
            "correct": "you",
            "options": [
                {"value": "you", "thai": "คุณ", "romanized": "(khun)", "icon": "👤", "note": "Mid tone - polite \"you\""},
                {"value": "I", "thai": "ผม", "romanized": "(phǒm)", "icon": "🧑", "note": "Rising/mid tones - male \"I\""},
                {"value": "he", "thai": "เขา", "romanized": "(khǎo)", "icon": "👨", "note": "Rising tone"},
                {"value": "friend", "thai": "เพื่อน", "romanized": "(phêuan)", "icon": "🤝", "note": "Falling tone"}
            ]
        },
        {
            "question": 'How do you say "Goodbye"?',
            "audio": "laa gawn",
            "correct": "goodbye",
            "options": [
                {"value": "goodbye", "thai": "ลาก่อน", "romanized": "(laa-gàwn)", "icon": "👋", "note": "Mid + falling tones"},
                {"value": "see you", "thai": "แล้วเจอกัน", "romanized": "(láew joo-gan)", "icon": "🙂", "note": "High + mid + mid tones"},
                {"value": "take care", "thai": "ดูแลตัวเอง", "romanized": "(doo-lae dtuua-eng)", "icon": "💕", "note": "Mid + mid + mid + mid tones"},
                {"value": "goodnight", "thai": "ราตรีสวัสดิ์", "romanized": "(raa-dtree sà-wàt)", "icon": "🌙", "note": "Mid + mid + low tones"}
            ]
        }
    ],
    2: [
        {
            "question": 'How do you say "Thank you"?',
            "audio": "khob khun",
            "correct": "khob khun",
            "options": [
                {"value": "khob khun", "thai": "ขอบคุณ", "romanized": "(khòp-khun)", "icon": "🙏", "note": "Low + mid tones"},
                {"value": "hello", "thai": "สวัสดี", "romanized": "(sà-wàt-dii)", "icon": "👋", "note": "Low + high + mid tones"},
                {"value": "sorry", "thai": "ขอโทษ", "romanized": "(khǎaw-thôot)", "icon": "😔", "note": "Rising + falling tones"},
                {"value": "goodbye", "thai": "ลาก่อน", "romanized": "(laa-gàwn)", "icon": "🚶", "note": "Mid + falling tones"}
            ]
        },
        {
            "question": 'How do you say "Thank you very much" (female)?',
            "audio": "khob khun mak ka",
            "correct": "thank you very much female",
            "options": [
                {"value": "thank you very much female", "thai": "ขอบคุณมากค่ะ", "romanized": "(khòp-khun mâak khà)", "icon": "🙏", "note": "Low + mid + fall + low - female"},
                {"value": "thank you very much male", "thai": "ขอบคุณมากครับ", "romanized": "(khòp-khun mâak kráp)", "icon": "🙇‍♂️", "note": "Low + mid + fall + mid - male"},
                {"value": "thank you", "thai": "ขอบคุณ", "romanized": "(khòp-khun)", "icon": "🙏", "note": "Low + mid tones"},
                {"value": "youre welcome", "thai": "ยินดี", "romanized": "(yin-dii)", "icon": "😊", "note": "Mid + mid tones"}
            ]
        },
        {
            "question": 'How do you reply to "thank you"?',
            "audio": "yin dee",
            "correct": "youre welcome",
            "options": [
                {"value": "youre welcome", "thai": "ยินดี", "romanized": "(yin-dii)", "icon": "😊", "note": "Mid + mid tones"},
                {"value": "yes", "thai": "ใช่", "romanized": "(châi)", "icon": "✅", "note": "Falling tone"},
                {"value": "no", "thai": "ไม่", "romanized": "(mâi)", "icon": "❌", "note": "Falling tone"},
                {"value": "ok", "thai": "โอเค", "romanized": "(oo-khay)", "icon": "👍", "note": "Mid + mid tones"}
            ]
        },
        {
            "question": 'What does "ขอโทษ" mean?',
            "audio": "khaw thot",
            "correct": "sorry",
            "options": [
                {"value": "sorry", "thai": "ขอโทษ", "romanized": "(khǎaw-thôot)", "icon": "😔", "note": "Rising + falling tones"},
                {"value": "excuse me", "thai": "ขอโทษนะ", "romanized": "(khǎaw-thôot ná)", "icon": "🙋", "note": "Rising + fall + high"},
                {"value": "thank you", "thai": "ขอบคุณ", "romanized": "(khòp-khun)", "icon": "🙏", "note": "Low + mid tones"},
                {"value": "please", "thai": "กรุณา", "romanized": "(ga-rú-naa)", "icon": "🙏", "note": "Mid + mid + mid tones"}
            ]
        },
        {
            "question": 'What does "ไม่เป็นไร" mean?',
            "audio": "mai pen rai",
            "correct": "its okay",
            "options": [
                {"value": "its okay", "thai": "ไม่เป็นไร", "romanized": "(mâi pen rai)", "icon": "🙂", "note": "High + mid + mid tones"},
                {"value": "no problem", "thai": "ไม่มีปัญหา", "romanized": "(mâi mii pan-hǎa)", "icon": "✅", "note": "High + mid + mid + high tones"},
                {"value": "yes", "thai": "ใช่", "romanized": "(châi)", "icon": "👍", "note": "Falling tone"},
                {"value": "impossible", "thai": "เป็นไปไม่ได้", "romanized": "(pen pai mâi dâi)", "icon": "🚫", "note": "Mid + mid + high + fall tones"}
            ]
        }
    ],
    3: [
        {
            "question": 'How do you say "My name is..." (male speaker)?',
            "audio": "phom cheu",
            "correct": "pom cheu",
            "options": [
                {"value": "pom cheu", "thai": "ผมชื่อ...", "romanized": "(phǒm chêu...)", "icon": "🙋‍♂️", "note": "Male: phǒm chêu (rising + falling tones)"},
                {"value": "chan cheu", "thai": "ฉันชื่อ...", "romanized": "(chǎn chêu...)", "icon": "🙋‍♀️", "note": "Female: chǎn chêu (rising + falling tones)"},
                {"value": "khun cheu", "thai": "คุณชื่อ...", "romanized": "(khun chêu...)", "icon": "👤", "note": "Your name is..."},
                {"value": "phom ma jaak", "thai": "ผมมาจาก...", "romanized": "(phǒm maa jàak...)", "icon": "🌍", "note": "I'm from..."}
            ]
        },
        {
            "question": 'How do you say "My name is..." (female speaker)?',
            "audio": "chan cheu",
            "correct": "chan cheu",
            "options": [
                {"value": "chan cheu", "thai": "ฉันชื่อ...", "romanized": "(chǎn chêu...)", "icon": "🙋‍♀️", "note": "Female: chǎn chêu (rising + falling tones)"},
                {"value": "pom cheu", "thai": "ผมชื่อ...", "romanized": "(phǒm chêu...)", "icon": "🙋‍♂️", "note": "Male: phǒm chêu (rising + falling tones)"},
                {"value": "di chan cheu", "thai": "ดิฉันชื่อ...", "romanized": "(di-chǎn chêu...)", "icon": "👩", "note": "Very formal female"},
                {"value": "rao cheu", "thai": "เราชื่อ...", "romanized": "(rao chêu...)", "icon": "🙂", "note": "Casual \"I\""}
            ]
        },
        {
            "question": 'How do you ask "What is your name?"',
            "audio": "khun cheu arai",
            "correct": "khun cheu arai",
            "options": [
                {"value": "khun cheu arai", "thai": "คุณชื่ออะไร", "romanized": "(khun chêu à-rai)", "icon": "❓", "note": "Polite question"},
                {"value": "khun pai nai", "thai": "คุณไปไหน", "romanized": "(khun pai nǎi)", "icon": "🚶", "note": "Where are you going?"},
                {"value": "khun maa jaak nai", "thai": "คุณมาจากไหน", "romanized": "(khun maa jàak nǎi)", "icon": "🏠", "note": "Where are you from?"},
                {"value": "khun sabai dee mai", "thai": "คุณสบายดีไหม", "romanized": "(khun sà-baai dii mǎi)", "icon": "😊", "note": "How are you?"}
            ]
        },
        {
            "question": 'What does "ดีใจที่ได้รู้จัก" mean?',
            "audio": "dee jai thi dai roojak",
            "correct": "nice to meet you",
            "options": [
                {"value": "nice to meet you", "thai": "ดีใจที่ได้รู้จัก", "romanized": "(dii jai thîi dâi rúu-jàk)", "icon": "🤝", "note": "Mid + mid + fall + fall + low tones"},
                {"value": "see you later", "thai": "แล้วเจอกัน", "romanized": "(láew joo gan)", "icon": "👋", "note": "High + mid + mid tones"},
                {"value": "take care", "thai": "ดูแลตัวเอง", "romanized": "(doo lae dtuua eng)", "icon": "💕", "note": "Mid + mid + mid + mid tones"},
                {"value": "good luck", "thai": "โชคดี", "romanized": "(chóok dii)", "icon": "🍀", "note": "High + mid tones"}
            ]
        },
        {
            "question": 'How do you ask "How are you?"',
            "audio": "sabai dee mai",
            "correct": "how are you",
            "options": [
                {"value": "how are you", "thai": "สบายดีไหม", "romanized": "(sà-baai dii mǎi)", "icon": "😊", "note": "Mid + mid + high tones"},
                {"value": "where are you", "thai": "อยู่ไหน", "romanized": "(yùu nǎi)", "icon": "📍", "note": "Falling + high tones"},
                {"value": "who are you", "thai": "เป็นใคร", "romanized": "(pen khrai)", "icon": "🤔", "note": "Mid + mid tones"},
                {"value": "are you okay", "thai": "ไม่เป็นไรใช่ไหม", "romanized": "(mâi pen rai châi mǎi)", "icon": "🙂", "note": "High + mid + mid + fall + high tones"}
            ]
        }
    ],
    # Unit 2: Numbers & Shopping (Lessons 4-5)
    4: [
        {
            "question": 'What is "หนึ่ง" (1)?',
            "audio": "neung",
            "correct": "one",
            "options": [
                {"value": "one", "thai": "หนึ่ง", "romanized": "(nèung)", "icon": "1️⃣", "note": "Low tone"},
                {"value": "two", "thai": "สอง", "romanized": "(sǎawng)", "icon": "2️⃣", "note": "Rising tone"},
                {"value": "three", "thai": "สาม", "romanized": "(sǎam)", "icon": "3️⃣", "note": "Rising tone"},
                {"value": "five", "thai": "ห้า", "romanized": "(hâa)", "icon": "5️⃣", "note": "Falling tone"}
            ]
        },
        {
            "question": 'What is "สี่" (4)?',
            "audio": "see",
            "correct": "four",
            "options": [
                {"value": "four", "thai": "สี่", "romanized": "(sìi)", "icon": "4️⃣", "note": "Low tone"},
                {"value": "five", "thai": "ห้า", "romanized": "(hâa)", "icon": "5️⃣", "note": "Falling tone"},
                {"value": "seven", "thai": "เจ็ด", "romanized": "(jèt)", "icon": "7️⃣", "note": "Low tone"},
                {"value": "ten", "thai": "สิบ", "romanized": "(sìp)", "icon": "🔟", "note": "Low tone"}
            ]
        },
        {
            "question": 'What is "ห้า" (5)?',
            "audio": "haa",
            "correct": "five",
            "options": [
                {"value": "five", "thai": "ห้า", "romanized": "(hâa)", "icon": "5️⃣", "note": "Falling tone"},
                {"value": "six", "thai": "หก", "romanized": "(hòk)", "icon": "6️⃣", "note": "Low tone"},
                {"value": "four", "thai": "สี่", "romanized": "(sìi)", "icon": "4️⃣", "note": "Low tone"},
                {"value": "nine", "thai": "เก้า", "romanized": "(kâo)", "icon": "9️⃣", "note": "Falling tone"}
            ]
        },
        {
            "question": 'How do you say "ten" (10)?',
            "audio": "sip",
            "correct": "sip",
            "options": [
                {"value": "sip", "thai": "สิบ", "romanized": "(sìp)", "icon": "🔟", "note": "Low tone"},
                {"value": "roi", "thai": "ร้อย", "romanized": "(rói)", "icon": "💯", "note": "Falling tone (100)"},
                {"value": "nueng", "thai": "หนึ่ง", "romanized": "(nèung)", "icon": "1️⃣", "note": "Low tone"},
                {"value": "kao", "thai": "เก้า", "romanized": "(kâo)", "icon": "9️⃣", "note": "Falling tone"}
            ]
        },
        {
            "question": 'What is "ยี่สิบ" (20)?',
            "audio": "yee sip",
            "correct": "twenty",
            "options": [
                {"value": "twenty", "thai": "ยี่สิบ", "romanized": "(yîi sìp)", "icon": "2️⃣0️⃣", "note": "Falling + low tones"},
                {"value": "twelve", "thai": "สิบสอง", "romanized": "(sìp sǎawng)", "icon": "1️⃣2️⃣", "note": "Low + rising tones"},
                {"value": "two", "thai": "สอง", "romanized": "(sǎawng)", "icon": "2️⃣", "note": "Rising tone"},
                {"value": "twenty one", "thai": "ยี่สิบเอ็ด", "romanized": "(yîi sìp èt)", "icon": "2️⃣1️⃣", "note": "Falling + low + low tones"}
            ]
        }
    ],
    5: [
        {
            "question": 'How do you ask "How much?" in Thai?',
            "audio": "gee baht",
            "correct": "how much",
            "options": [
                {"value": "how much", "thai": "เท่าไหร่", "romanized": "(thâu rài)", "icon": "💵", "note": "Falling + low tones"},
                {"value": "how many baht", "thai": "กี่บาท", "romanized": "(kìi bàat)", "icon": "💰", "note": "Rising + mid tones"},
                {"value": "how many", "thai": "กี่", "romanized": "(kìi)", "icon": "❓", "note": "Rising tone"},
                {"value": "too much", "thai": "มากไป", "romanized": "(mâak pai)", "icon": "🫨", "note": "Falling + mid tones"}
            ]
        },
        {
            "question": 'What does "แพง" mean?',
            "audio": "phaeng",
            "correct": "expensive",
            "options": [
                {"value": "expensive", "thai": "แพง", "romanized": "(phaaeng)", "icon": "💸", "note": "Falling tone"},
                {"value": "cheap", "thai": "ถูก", "romanized": "(thùuk)", "icon": "💰", "note": "Low tone"},
                {"value": "good", "thai": "ดี", "romanized": "(dii)", "icon": "✅", "note": "Mid tone"},
                {"value": "bad", "thai": "ไม่ดี", "romanized": "(mâi dii)", "icon": "❌", "note": "Falling + mid tones"}
            ]
        },
        {
            "question": 'How do you say "Can you reduce the price?"',
            "audio": "lot dai mai",
            "correct": "can reduce",
            "options": [
                {"value": "can discount", "thai": "ลดได้ไหม", "romanized": "(lót dâi mǎi)", "icon": "🎯", "note": "High + falling + falling tones"},
                {"value": "expensive", "thai": "แพง", "romanized": "(phaaeng)", "icon": "💸", "note": "Falling tone"},
                {"value": "fixed price", "thai": "ราคาเดียว", "romanized": "(raa-khaa diao)", "icon": "🚫", "note": "Mid + mid + mid tones"},
                {"value": "too much", "thai": "มากไป", "romanized": "(mâak pai)", "icon": "🫨", "note": "Falling + mid tones"}
            ]
        },
        {
            "question": 'What does "ถูก" mean?',
            "audio": "thuk",
            "correct": "cheap",
            "options": [
                {"value": "cheap", "thai": "ถูก", "romanized": "(thùuk)", "icon": "💰", "note": "Low tone"},
                {"value": "expensive", "thai": "แพง", "romanized": "(phaaeng)", "icon": "💸", "note": "Falling tone"},
                {"value": "correct", "thai": "ถูกต้อง", "romanized": "(thùuk dtông)", "icon": "✅", "note": "Low + falling tones"},
                {"value": "free", "thai": "ฟรี", "romanized": "(free)", "icon": "🆓", "note": "Mid tone (loanword)"}
            ]
        },
        {
            "question": 'How do you say "I want to buy this" (female)?',
            "audio": "chan ao arai nee ka",
            "correct": "want buy this female",
            "options": [
                {"value": "want buy this female", "thai": "ฉันเอาอันนี้ค่ะ", "romanized": "(chǎn ao an-níi khà)", "icon": "🛍️", "note": "Rise + mid + mid + fall + low"},
                {"value": "want buy this male", "thai": "ผมเอาอันนี้ครับ", "romanized": "(phǒm ao an-níi kráp)", "icon": "🛍️", "note": "Rise + mid + mid + fall + mid"},
                {"value": "dont want", "thai": "ไม่เอา", "romanized": "(mâi ao)", "icon": "🙅", "note": "High + mid tones"},
                {"value": "just looking", "thai": "ดูก่อน", "romanized": "(doo gàwn)", "icon": "👀", "note": "Mid + falling tones"}
            ]
        }
    ],
    # Unit 3: Food & Dining (Lessons 6-9)
    6: [
        {
            "question": 'What does "เผ็ด" mean?',
            "audio": "pet",
            "correct": "spicy",
            "options": [
                {"value": "spicy", "thai": "เผ็ด", "romanized": "(pèt)", "icon": "🌶️", "note": "High tone"},
                {"value": "sweet", "thai": "หวาน", "romanized": "(wǎn)", "icon": "🍯", "note": "Rising tone"},
                {"value": "sour", "thai": "เปรี้ยว", "romanized": "(prîaw)", "icon": "🥪", "note": "Falling tone"},
                {"value": "salty", "thai": "เค็ม", "romanized": "(khém)", "icon": "🧂", "note": "High tone"}
            ]
        },
        {
            "question": 'What does "หวาน" mean?',
            "audio": "wan",
            "correct": "sweet",
            "options": [
                {"value": "sweet", "thai": "หวาน", "romanized": "(wǎn)", "icon": "🍯", "note": "Rising tone"},
                {"value": "spicy", "thai": "เผ็ด", "romanized": "(pèt)", "icon": "🌶️", "note": "High tone"},
                {"value": "bitter", "thai": "ขม", "romanized": "(khǒm)", "icon": "🍵", "note": "Rising tone"},
                {"value": "bland", "thai": "จืด", "romanized": "(jùut)", "icon": "🥣", "note": "Low tone"}
            ]
        },
        {
            "question": 'What does "เปรี้ยว" mean?',
            "audio": "priaw",
            "correct": "sour",
            "options": [
                {"value": "sour", "thai": "เปรี้ยว", "romanized": "(prîaw)", "icon": "🍋", "note": "Falling tone"},
                {"value": "sweet", "thai": "หวาน", "romanized": "(wǎn)", "icon": "🍯", "note": "Rising tone"},
                {"value": "salty", "thai": "เค็ม", "romanized": "(khém)", "icon": "🧂", "note": "High tone"},
                {"value": "spicy", "thai": "เผ็ด", "romanized": "(pèt)", "icon": "🌶️", "note": "High tone"}
            ]
        },
        {
            "question": 'What does "จืด" mean?',
            "audio": "jeut",
            "correct": "bland",
            "options": [
                {"value": "bland", "thai": "จืด", "romanized": "(jùut)", "icon": "🥣", "note": "Low tone"},
                {"value": "salty", "thai": "เค็ม", "romanized": "(khém)", "icon": "🧂", "note": "High tone"},
                {"value": "delicious", "thai": "อร่อย", "romanized": "(à-ròi)", "icon": "😋", "note": "Low tone"},
                {"value": "smelly", "thai": "เหม็น", "romanized": "(mèn)", "icon": "👃", "note": "Low tone"}
            ]
        },
        {
            "question": 'How do you say "Not spicy"?',
            "audio": "mai pet",
            "correct": "not spicy",
            "options": [
                {"value": "not spicy", "thai": "ไม่เผ็ด", "romanized": "(mâi pèt)", "icon": "🌶️❌", "note": "High + high tones"},
                {"value": "very spicy", "thai": "เผ็ดมาก", "romanized": "(pèt mâak)", "icon": "🔥", "note": "High + falling tones"},
                {"value": "a little spicy", "thai": "เผ็ดนิดหน่อย", "romanized": "(pèt nít nòi)", "icon": "🌶️", "note": "High + high + falling tones"},
                {"value": "too sweet", "thai": "หวานมาก", "romanized": "(wǎn mâak)", "icon": "🍯", "note": "Rising + falling tones"}
            ]
        }
    ],
    7: [
        {
            "question": 'How do you say "I want"?',
            "audio": "ao",
            "correct": "ao",
            "options": [
                {"value": "ao", "thai": "เอา", "romanized": "(ao)", "icon": "🙋", "note": "Mid tone"},
                {"value": "mai", "thai": "ไม่", "romanized": "(mâi)", "icon": "❌", "note": "Falling tone"},
                {"value": "dai", "thai": "ได้", "romanized": "(dâi)", "icon": "✅", "note": "Falling tone"},
                {"value": "chob", "thai": "ชอบ", "romanized": "(chòp)", "icon": "❤️", "note": "Low tone"}
            ]
        },
        {
            "question": 'How do you politely say "I would like" (male)?',
            "audio": "kor arai krab",
            "correct": "would like male",
            "options": [
                {"value": "would like male", "thai": "ขอ...ครับ", "romanized": "(khǎaw... kráp)", "icon": "🙏", "note": "Rising + mid - polite male"},
                {"value": "would like female", "thai": "ขอ...ค่ะ", "romanized": "(khǎaw... khà)", "icon": "🙏", "note": "Rising + low - polite female"},
                {"value": "want casual", "thai": "เอา", "romanized": "(ao)", "icon": "🙋", "note": "Mid tone - casual"},
                {"value": "give me", "thai": "ให้หน่อย", "romanized": "(hâai nòi)", "icon": "👐", "note": "Falling + falling tones"}
            ]
        },
        {
            "question": 'How do you say "I dont want"?',
            "audio": "mai ao",
            "correct": "dont want",
            "options": [
                {"value": "dont want", "thai": "ไม่เอา", "romanized": "(mâi ao)", "icon": "🙅", "note": "High + mid tones"},
                {"value": "want", "thai": "เอา", "romanized": "(ao)", "icon": "🙋", "note": "Mid tone"},
                {"value": "cannot", "thai": "ไม่ได้", "romanized": "(mâi dâi)", "icon": "🚫", "note": "High + falling tones"},
                {"value": "dont like", "thai": "ไม่ชอบ", "romanized": "(mâi chòp)", "icon": "👎", "note": "High + low tones"}
            ]
        },
        {
            "question": 'What does "ชอบ" mean?',
            "audio": "chob",
            "correct": "like",
            "options": [
                {"value": "like", "thai": "ชอบ", "romanized": "(chòp)", "icon": "❤️", "note": "Low tone"},
                {"value": "love", "thai": "รัก", "romanized": "(rák)", "icon": "💖", "note": "High tone"},
                {"value": "want", "thai": "เอา", "romanized": "(ao)", "icon": "🙋", "note": "Mid tone"},
                {"value": "hate", "thai": "เกลียด", "romanized": "(glìat)", "icon": "😠", "note": "Low tone"}
            ]
        },
        {
            "question": 'How do you say "Delicious"?',
            "audio": "aroi",
            "correct": "delicious",
            "options": [
                {"value": "delicious", "thai": "อร่อย", "romanized": "(à-ròi)", "icon": "😋", "note": "Low tone"},
                {"value": "yummy", "thai": "น่ากิน", "romanized": "(nâa gin)", "icon": "🤤", "note": "Falling + mid tones"},
                {"value": "full", "thai": "อิ่ม", "romanized": "(ìm)", "icon": "🤰", "note": "Low tone"},
                {"value": "hungry", "thai": "หิว", "romanized": "(hǐu)", "icon": "🍽️", "note": "Rising tone"}
            ]
        }
    ],
    8: [
        {
            "question": 'What is "น้ำ"?',
            "audio": "nam",
            "correct": "water",
            "options": [
                {"value": "rice", "thai": "ข้าว", "romanized": "(khâo)", "icon": "🍚", "note": "Falling tone"},
                {"value": "noodles", "thai": "ก๋วยเตี๋ยว", "romanized": "(gǎo dtǐaw)", "icon": "🍜", "note": "Rising + falling tones"},
                {"value": "water", "thai": "น้ำ", "romanized": "(nám)", "icon": "💧", "note": "High tone"},
                {"value": "ice", "thai": "น้ำแข็ง", "romanized": "(nám khǎeng)", "icon": "🧊", "note": "High + low tones"}
            ]
        },
        {
            "question": 'What is "ข้าว"?',
            "audio": "khao",
            "correct": "rice",
            "options": [
                {"value": "rice", "thai": "ข้าว", "romanized": "(khâo)", "icon": "🍚", "note": "Falling tone"},
                {"value": "soup", "thai": "น้ำซุป", "romanized": "(nám sûp)", "icon": "🥣", "note": "High + high tones"},
                {"value": "noodles", "thai": "ก๋วยเตี๋ยว", "romanized": "(gǎo dtǐaw)", "icon": "🍜", "note": "Rising + falling tones"},
                {"value": "bread", "thai": "ขนมปัง", "romanized": "(khà-nǒm pang)", "icon": "🍞", "note": "Low + low + mid tones"}
            ]
        },
        {
            "question": 'What is "ก๋วยเตี๋ยว"?',
            "audio": "kuay tiao",
            "correct": "noodles",
            "options": [
                {"value": "noodles", "thai": "ก๋วยเตี๋ยว", "romanized": "(gǎo dtǐaw)", "icon": "🍜", "note": "Rising + falling tones"},
                {"value": "rice", "thai": "ข้าว", "romanized": "(khâo)", "icon": "🍚", "note": "Falling tone"},
                {"value": "curry", "thai": "แกง", "romanized": "(gaeng)", "icon": "🍛", "note": "Mid tone"},
                {"value": "stir fry", "thai": "ผัด", "romanized": "(phàt)", "icon": "🥘", "note": "Low tone"}
            ]
        },
        {
            "question": 'What is "ผัดไทย"?',
            "audio": "pad thai",
            "correct": "pad thai",
            "options": [
                {"value": "pad thai", "thai": "ผัดไทย", "romanized": "(phàt thai)", "icon": "🍜", "note": "Low + mid tones"},
                {"value": "green curry", "thai": "แกงเขียวหวาน", "romanized": "(gaeng khǐaw wǎan)", "icon": "🍛", "note": "Mid + rising + rising tones"},
                {"value": "mango rice", "thai": "ข้าวเหนียวมะม่วง", "romanized": "(khâaw nǐaw má-mûang)", "icon": "🥭", "note": "Fall + fall + mid + fall tones"},
                {"value": "tom yum", "thai": "ต้มยำ", "romanized": "(dtôm yam)", "icon": "🍲", "note": "Falling + mid tones"}
            ]
        },
        {
            "question": 'How do you say "I am vegetarian" (female)?',
            "audio": "chan gin jay ka",
            "correct": "vegetarian female",
            "options": [
                {"value": "vegetarian female", "thai": "ฉันกินเจค่ะ", "romanized": "(chǎn gin jay khà)", "icon": "🥗", "note": "Rise + mid + mid + low"},
                {"value": "vegetarian male", "thai": "ผมกินเจครับ", "romanized": "(phǒm gin jay kráp)", "icon": "🥗", "note": "Rise + mid + mid + mid"},
                {"value": "i eat meat", "thai": "ฉันกินเนื้อ", "romanized": "(chǎn gin núea)", "icon": "🥩", "note": "Rise + mid + high tones"},
                {"value": "i eat everything", "thai": "ฉันกินได้ทุกอย่าง", "romanized": "(chǎn gin dâi thúk yàang)", "icon": "🍽️", "note": "Rise + mid + fall + fall + fall"}
            ]
        }
    ],
    9: [
        {
            "question": 'Translate: "ไม่เผ็ด"',
            "audio": "mai pet",
            "correct": "not spicy",
            "options": [
                {"value": "very spicy", "thai": "เผ็ดมาก", "romanized": "(pèt mâak)", "icon": "🔥", "note": "High + falling tones"},
                {"value": "not spicy", "thai": "ไม่เผ็ด", "romanized": "(mâi pèt)", "icon": "🌶️❌", "note": "High + high tones"},
                {"value": "a little", "thai": "นิดหน่อย", "romanized": "(nít nòi)", "icon": "👆", "note": "High + falling tones"},
                {"value": "delicious", "thai": "อร่อย", "romanized": "(à-ròi)", "icon": "😋", "note": "Low tone"}
            ]
        },
        {
            "question": 'Translate: "เผ็ดมาก"',
            "audio": "pet mak",
            "correct": "very spicy",
            "options": [
                {"value": "very spicy", "thai": "เผ็ดมาก", "romanized": "(pèt mâak)", "icon": "🔥", "note": "High + falling tones"},
                {"value": "not spicy", "thai": "ไม่เผ็ด", "romanized": "(mâi pèt)", "icon": "🌶️❌", "note": "High + high tones"},
                {"value": "too salty", "thai": "เค็มมาก", "romanized": "(khém mâak)", "icon": "🧂", "note": "High + falling tones"},
                {"value": "too sweet", "thai": "หวานมาก", "romanized": "(wǎn mâak)", "icon": "🍯", "note": "Rising + falling tones"}
            ]
        },
        {
            "question": 'What does "นิดหน่อย" mean?',
            "audio": "nid noi",
            "correct": "a little",
            "options": [
                {"value": "a little", "thai": "นิดหน่อย", "romanized": "(nít nòi)", "icon": "👌", "note": "High + falling tones"},
                {"value": "a lot", "thai": "มาก", "romanized": "(mâak)", "icon": "⬆️", "note": "Falling tone"},
                {"value": "none", "thai": "ไม่มี", "romanized": "(mâi mii)", "icon": "🚫", "note": "High + mid tones"},
                {"value": "enough", "thai": "พอ", "romanized": "(phɔɔ)", "icon": "✋", "note": "Mid tone"}
            ]
        },
        {
            "question": 'How do you say "The check, please" (male)?',
            "audio": "check bin krab",
            "correct": "check please male",
            "options": [
                {"value": "check please male", "thai": "เช็คบิลครับ", "romanized": "(chék bin kráp)", "icon": "🧾", "note": "Low + mid + mid"},
                {"value": "check please female", "thai": "เช็คบิลค่ะ", "romanized": "(chék bin khà)", "icon": "🧾", "note": "Low + mid + low"},
                {"value": "how much", "thai": "เท่าไหร่", "romanized": "(thâu rài)", "icon": "💵", "note": "Falling + low tones"},
                {"value": "expensive", "thai": "แพง", "romanized": "(phaaeng)", "icon": "💸", "note": "Falling tone"}
            ]
        },
        {
            "question": 'How do you say "Im full" (female)?',
            "audio": "chan im laew ka",
            "correct": "im full female",
            "options": [
                {"value": "im full female", "thai": "ฉันอิ่มแล้วค่ะ", "romanized": "(chǎn ìm láew khà)", "icon": "🤰", "note": "Rise + low + high + low"},
                {"value": "im full male", "thai": "ผมอิ่มแล้วครับ", "romanized": "(phǒm ìm láew kráp)", "icon": "🤰", "note": "Rise + low + high + mid"},
                {"value": "im hungry", "thai": "ฉันหิว", "romanized": "(chǎn hǐu)", "icon": "🍽️", "note": "Rise + rising tones"},
                {"value": "still want more", "thai": "เอาอีก", "romanized": "(ao ìik)", "icon": "🍴", "note": "Mid + falling tones"}
            ]
        }
    ],
    # Unit 4: Getting Around (Lessons 10-13)
    10: [
        {
            "question": 'How do you say "Use the meter"?',
            "audio": "meter",
            "correct": "meter",
            "options": [
                {"value": "meter", "thai": "เปิดมิเตอร์", "romanized": "(pòoet mi-dtoo)", "icon": "🚕", "note": "Low + mid tones"},
                {"value": "expensive", "thai": "แพง", "romanized": "(phaaeng)", "icon": "💸", "note": "Falling tone"},
                {"value": "cheap", "thai": "ถูก", "romanized": "(thùuk)", "icon": "💰", "note": "Low tone"},
                {"value": "fast", "thai": "เร็ว", "romanized": "(reo)", "icon": "⚡", "note": "Mid tone"}
            ]
        },
        {
            "question": 'What does "ไปที่..." mean?',
            "audio": "pai thi",
            "correct": "go to",
            "options": [
                {"value": "go to", "thai": "ไปที่...", "romanized": "(pai thîi...)", "icon": "📍", "note": "Mid + falling tones"},
                {"value": "from where", "thai": "มาจาก", "romanized": "(maa jàak)", "icon": "🛣️", "note": "High + low tones"},
                {"value": "stop here", "thai": "จอดตรงนี้", "romanized": "(jàwt dtrong nîi)", "icon": "🛑", "note": "Low + mid + falling tones"},
                {"value": "turn around", "thai": "กลับรถ", "romanized": "(klàp rót)", "icon": "🚗", "note": "Low + mid tones"}
            ]
        },
        {
            "question": 'Translate: "กี่บาท"',
            "audio": "gee baht",
            "correct": "how many baht",
            "options": [
                {"value": "how many baht", "thai": "กี่บาท", "romanized": "(kìi bàat)", "icon": "💵", "note": "Rising + mid tones"},
                {"value": "how far", "thai": "ไกลไหม", "romanized": "(glai mǎi)", "icon": "📏", "note": "Mid + high tones"},
                {"value": "how long", "thai": "นานไหม", "romanized": "(naan mǎi)", "icon": "⏰", "note": "Mid + high tones"},
                {"value": "how many km", "thai": "กี่กิโล", "romanized": "(kìi gî-loo)", "icon": "🏁", "note": "Rising + mid tones"}
            ]
        },
        {
            "question": 'How do you ask "Is it far?"?',
            "audio": "glai mai",
            "correct": "is it far",
            "options": [
                {"value": "is it far", "thai": "ไกลไหม", "romanized": "(glai mǎi)", "icon": "🛣️", "note": "Mid + high tones"},
                {"value": "is it near", "thai": "ใกล้ไหม", "romanized": "(glâi mǎi)", "icon": "📍", "note": "Falling + high tones"},
                {"value": "is it long", "thai": "นานไหม", "romanized": "(naan mǎi)", "icon": "⏰", "note": "Mid + high tones"},
                {"value": "is it traffic", "thai": "รถติดไหม", "romanized": "(rót dtìt mǎi)", "icon": "🚦", "note": "Mid + low + high tones"}
            ]
        },
        {
            "question": 'How do you say "Please hurry" (male)?',
            "audio": "reo noi krab",
            "correct": "hurry male",
            "options": [
                {"value": "hurry male", "thai": "เร็วหน่อยครับ", "romanized": "(reo nòi kráp)", "icon": "🏃", "note": "Mid + fall + mid"},
                {"value": "hurry female", "thai": "เร็วหน่อยค่ะ", "romanized": "(reo nòi khà)", "icon": "🏃", "note": "Mid + fall + low"},
                {"value": "slow down", "thai": "ช้าลง", "romanized": "(châa long)", "icon": "🐢", "note": "Falling + mid tones"},
                {"value": "stop", "thai": "หยุด", "romanized": "(yùut)", "icon": "🛑", "note": "Low tone"}
            ]
        }
    ],
    11: [
        {
            "question": 'How do you say "Turn left"?',
            "audio": "liaw sai",
            "correct": "left",
            "options": [
                {"value": "left", "thai": "เลี้ยวซ้าย", "romanized": "(lîaw sâai)", "icon": "⬅️", "note": "Falling + falling tones"},
                {"value": "right", "thai": "เลี้ยวขวา", "romanized": "(lîaw khwǎa)", "icon": "➡️", "note": "Falling + falling tones"},
                {"value": "straight", "thai": "ตรงไป", "romanized": "(dtrong pai)", "icon": "⬆️", "note": "Mid + mid tones"},
                {"value": "uturn", "thai": "กลับรถ", "romanized": "(klàp rót)", "icon": "🔄", "note": "Low + mid tones"}
            ]
        },
        {
            "question": 'What does "จอดตรงนี้" mean?',
            "audio": "jawt dtrong nee",
            "correct": "stop here",
            "options": [
                {"value": "stop here", "thai": "จอดตรงนี้", "romanized": "(jàwt dtrong nîi)", "icon": "🛑", "note": "Low + mid + falling tones"},
                {"value": "go ahead", "thai": "ไปเลย", "romanized": "(pai loei)", "icon": "➡️", "note": "Mid + falling tones"},
                {"value": "slow down", "thai": "ช้าลง", "romanized": "(châa long)", "icon": "🚕", "note": "Falling + mid tones"},
                {"value": "speed up", "thai": "เร็วขึ้น", "romanized": "(reo khêun)", "icon": "🏎️", "note": "Mid + falling tones"}
            ]
        },
        {
            "question": 'Translate: "เลี้ยวขวา"',
            "audio": "liaw khwa",
            "correct": "turn right",
            "options": [
                {"value": "right", "thai": "เลี้ยวขวา", "romanized": "(lîaw khwǎa)", "icon": "➡️", "note": "Falling + falling tones"},
                {"value": "turn left", "thai": "เลี้ยวซ้าย", "romanized": "(lîaw sâai)", "icon": "⬅️", "note": "Falling + falling tones"},
                {"value": "at corner", "thai": "ตรงมุม", "romanized": "(dtrong mum)", "icon": "🚦", "note": "Mid + mid tones"},
                {"value": "next to", "thai": "ข้าง", "romanized": "(khâang)", "icon": "📳", "note": "Falling tone"}
            ]
        },
        {
            "question": 'How do you say "Go straight"?',
            "audio": "dtrong pai",
            "correct": "straight",
            "options": [
                {"value": "straight", "thai": "ตรงไป", "romanized": "(dtrong pai)", "icon": "⬆️", "note": "Mid + mid tones"},
                {"value": "turn", "thai": "เลี้ยว", "romanized": "(lîaw)", "icon": "↪️", "note": "Falling tone"},
                {"value": "stop", "thai": "หยุด", "romanized": "(yùut)", "icon": "🛑", "note": "Low tone"},
                {"value": "arrived", "thai": "ถึงแล้ว", "romanized": "(thǐung láew)", "icon": "📍", "note": "Low + high tones"}
            ]
        },
        {
            "question": 'How do you say "U-turn"?',
            "audio": "klap rot",
            "correct": "uturn",
            "options": [
                {"value": "uturn", "thai": "กลับรถ", "romanized": "(klàp rót)", "icon": "🔄", "note": "Low + mid tones"},
                {"value": "go back", "thai": "กลับไป", "romanized": "(klàp pai)", "icon": "🔙", "note": "Low + mid tones"},
                {"value": "continue", "thai": "ตรงไป", "romanized": "(dtrong pai)", "icon": "⬆️", "note": "Mid + mid tones"},
                {"value": "turn around", "thai": "หมุนกลับ", "romanized": "(mǔun klàp)", "icon": "🔄", "note": "Falling + low tones"}
            ]
        }
    ],
    12: [
        {
            "question": 'How do you say "Too expensive"?',
            "audio": "phaeng pai",
            "correct": "expensive",
            "options": [
                {"value": "expensive", "thai": "แพงไป", "romanized": "(phaaeng pai)", "icon": "💸", "note": "Falling + mid tones"},
                {"value": "cheap", "thai": "ถูก", "romanized": "(thùuk)", "icon": "💰", "note": "Low tone"},
                {"value": "can discount", "thai": "ลดได้ไหม", "romanized": "(lót dâi mǎi)", "icon": "🎯", "note": "High + falling + falling tones"},
                {"value": "fixed price", "thai": "ราคาต่อรอง", "romanized": "(râa-khâa dtòr rong)", "icon": "🚫", "note": "Falling + mid + high tones"}
            ]
        },
        {
            "question": 'What does "ถูกกว่านี้ได้ไหม" mean?',
            "audio": "thuk gwa nee dai mai",
            "correct": "can cheaper",
            "options": [
                {"value": "can cheaper", "thai": "ถูกกว่านี้ได้ไหม", "romanized": "(thùuk gwàa níi dâi mǎi)", "icon": "💵", "note": "Low + mid + mid + fall + high tones"},
                {"value": "too expensive", "thai": "แพงไป", "romanized": "(phaaeng pai)", "icon": "😱", "note": "Falling + mid tones"},
                {"value": "I dont want", "thai": "ไม่เอา", "romanized": "(mâi ao)", "icon": "🙅", "note": "High + mid tones"},
                {"value": "okay deal", "thai": "ได้เลย", "romanized": "(dâi loei)", "icon": "✅", "note": "Falling + falling tones"}
            ]
        },
        {
            "question": 'How do you say "Whats the price?"?',
            "audio": "ra kha tao rai",
            "correct": "what price",
            "options": [
                {"value": "what price", "thai": "ราคาเท่าไหร่", "romanized": "(raa-khâa thâu rài)", "icon": "💵", "note": "Mid + fall + fall + low tones"},
                {"value": "discount", "thai": "ส่วนลด", "romanized": "(sûan lót)", "icon": "🏷️", "note": "Falling + high tones"},
                {"value": "normal price", "thai": "ราคาปกติ", "romanized": "(raa-khâa bpòk-gà-dtì)", "icon": "📋", "note": "Mid + fall + low + low tones"},
                {"value": "special price", "thai": "ราคาพิเศษ", "romanized": "(raa-khâa phi-sèet)", "icon": "⭐", "note": "Mid + fall + low + low tones"}
            ]
        },
        {
            "question": 'How do you say "Its a deal" (male)?',
            "audio": "dai krab",
            "correct": "deal male",
            "options": [
                {"value": "deal male", "thai": "ได้ครับ", "romanized": "(dâi kráp)", "icon": "🤝", "note": "Falling + mid tones"},
                {"value": "deal female", "thai": "ได้ค่ะ", "romanized": "(dâi khà)", "icon": "🤝", "note": "Falling + low tones"},
                {"value": "no deal", "thai": "ไม่ได้", "romanized": "(mâi dâi)", "icon": "🚫", "note": "High + falling tones"},
                {"value": "maybe", "thai": " maybe", "romanized": "(mâi khâang)", "icon": "🤔", "note": "High + falling tones"}
            ]
        },
        {
            "question": 'How do you say "I will find another" (female)?',
            "audio": "chan ha khun khwa ka",
            "correct": "find another female",
            "options": [
                {"value": "find another female", "thai": "ฉันหาคันอื่นค่ะ", "romanized": "(chǎn hǎa khun èun khà)", "icon": "🚕", "note": "Rise + high + mid + fall + low"},
                {"value": "find another male", "thai": "ผมหาคันอื่นครับ", "romanized": "(phǒm hǎa khun èun kráp)", "icon": "🚕", "note": "Rise + high + mid + fall + mid"},
                {"value": "ill wait", "thai": "ฉันรอค่ะ", "romanized": "(chǎn rɔɔ khà)", "icon": "⏳", "note": "Rise + mid + low tones"},
                {"value": "too far", "thai": "ไกลเกิน", "romanized": "(glai gəən)", "icon": "🛣️", "note": "Mid + mid tones"}
            ]
        }
    ],
    13: [
        {
            "question": 'How do you say "Here" (when paying, male)?',
            "audio": "na khrap",
            "correct": "here male",
            "options": [
                {"value": "here male", "thai": "นะครับ", "romanized": "(na kráp)", "icon": "💳", "note": "Mid + mid tones"},
                {"value": "here female", "thai": "นะค่ะ", "romanized": "(na khà)", "icon": "💳", "note": "Mid + low tones"},
                {"value": "keep change", "thai": "ไม่ต้องทอน", "romanized": "(mâi dtòrng thâawn)", "icon": "👍", "note": "High + falling + high tones"},
                {"value": "receipt", "thai": "ใบเสร็จ", "romanized": "(bai sèt)", "icon": "🧾", "note": "Mid + falling tones"}
            ]
        },
        {
            "question": 'What does "เช็คบิล" mean?',
            "audio": "check bin",
            "correct": "check bill",
            "options": [
                {"value": "check bill", "thai": "เช็คบิล", "romanized": "(chék bin)", "icon": "🧹", "note": "Low + mid tones"},
                {"value": "cash", "thai": "เงินสด", "romanized": "(ngǐn sòt)", "icon": "💵", "note": "Rising + low tones"},
                {"value": "credit card", "thai": "บัตรเครดิต", "romanized": "(bàt khray-dît)", "icon": "💳", "note": "Mid + mid tones"},
                {"value": "tip", "thai": "ทิป", "romanized": "(thíp)", "icon": "💸", "note": "Low tone"}
            ]
        },
        {
            "question": 'How do you say "Keep the change"?',
            "audio": "mai dtong thon",
            "correct": "keep change",
            "options": [
                {"value": "keep change", "thai": "ไม่ต้องทอน", "romanized": "(mâi dtòrng thâawn)", "icon": "👍", "note": "High + falling + high tones"},
                {"value": "give change", "thai": "ทอนให้หน่อย", "romanized": "(thâawn hâai nòi)", "icon": "💰", "note": "High + falling + fall tones"},
                {"value": "exact amount", "thai": "พอดี", "romanized": "(phɔɔ-dii)", "icon": "✅", "note": "Mid + mid tones"},
                {"value": "no money", "thai": "ไม่มีเงิน", "romanized": "(mâi mii ngǐn)", "icon": "😅", "note": "High + mid + rising tones"}
            ]
        },
        {
            "question": 'How do you say "Thank you, goodbye" (female)?',
            "audio": "khob khun ka laew joo gan",
            "correct": "thanks goodbye female",
            "options": [
                {"value": "thanks goodbye female", "thai": "ขอบคุณค่ะ แล้วเจอกัน", "romanized": "(khòp-khun khà láew joo-gan)", "icon": "🙋‍♀️", "note": "Low + mid + low + high + mid + mid"},
                {"value": "thanks goodbye male", "thai": "ขอบคุณครับ แล้วเจอกัน", "romanized": "(khòp-khun kráp láew joo-gan)", "icon": "🙋‍♂️", "note": "Low + mid + mid + high + mid + mid"},
                {"value": "see you", "thai": "แล้วเจอกัน", "romanized": "(láew joo-gan)", "icon": "👋", "note": "High + mid + mid tones"},
                {"value": "good luck", "thai": "โชคดี", "romanized": "(chóok dii)", "icon": "🍀", "note": "High + mid tones"}
            ]
        },
        {
            "question": 'How do you say "Good luck / Safe travels"?',
            "audio": "chok dee",
            "correct": "good luck",
            "options": [
                {"value": "good luck", "thai": "โชคดี", "romanized": "(chóok dii)", "icon": "🍀", "note": "High + mid tones"},
                {"value": "be careful", "thai": "ระวัง", "romanized": "(rá-wang)", "icon": "⚠️", "note": "Mid + mid tones"},
                {"value": "drive safe", "thai": "ขับรถระวัง", "romanized": "(khàp rót rá-wang)", "icon": "🚗", "note": "Low + mid + mid + mid tones"},
                {"value": "have fun", "thai": "สนุกนะ", "romanized": "(sà-nùk ná)", "icon": "🎉", "note": "Low + high tones"}
            ]
        }
    ]
}

print("Lesson data generated successfully!")
print(f"Total lessons: {len(lesson_data)}")
for k, v in lesson_data.items():
    print(f"  Lesson {k}: {len(v)} exercises")
