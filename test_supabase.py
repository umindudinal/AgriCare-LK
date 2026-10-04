import sys
import urllib.request
import json

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

SUPABASE_URL = "https://ocbimbflroaamvcdzbbm.supabase.co"
SUPABASE_KEY = "sb_publishable_AfDYseNWF9vLm79hMHA_Ew_oTyaQcoM"

headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}"
}

print("🌿 Supabase Cloud Database එකට සම්බන්ධ වෙමින් පවතී...")

try:
    url = f"{SUPABASE_URL}/rest/v1/diseases?select=common_name_en,common_name_si,symptoms_si,treatments(treatment_type,instruction_si)"
    req = urllib.request.Request(url, headers=headers)
    
    with urllib.request.urlopen(req) as response:
        if response.status == 200:
            data = json.loads(response.read().decode('utf-8'))
            print(f"✅ සාර්ථකව සම්බන්ධ විය! මුළු රෝග සංඛ්‍යාව: {len(data)}\n")
            
            for disease in data[:3]:
                print(f"🌿 රෝගය (EN): {disease['common_name_en']}")
                print(f"🌿 රෝගය (SI): {disease['common_name_si']}")
                print(f"🔍 රෝග ලක්ෂණ: {disease['symptoms_si']}")
                print("💊 ප්‍රතිකාර:")
                for t in disease.get('treatments', []):
                    print(f"   [{t['treatment_type']}]: {t['instruction_si']}")
                print("-" * 50)
        else:
            print(f"❌ Error: {response.status}")

except Exception as e:
    print("❌ Error එකක් ආවා:", e)
