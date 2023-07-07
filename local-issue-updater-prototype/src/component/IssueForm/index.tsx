import React from 'react'

type Props = {}

const IssueForm = (props: Props) => {

    return (
        <div>
            <div>
                <label htmlFor='status'>สถานะปัญหา</label>
                <select id='status' placeholder=''>
                    <option value="volvo">รอดำเนินการตรวจสอบ</option>
                    <option value="saab">กำลังตรวจสอบ</option>
                    <option value="fiat">กำลังดำเนินการแก้ไข</option>
                    <option value="audi">แก้ไขเรียบร้อย</option>
                </select>
            </div>
            <div>
                <label htmlFor='detail'>รายละเอียด</label>
                <input type='text' id='detail' placeholder='' />
            </div>
            <div>
                <label htmlFor='type'>ประเภทปัญหา</label>
                <select id='type' placeholder=''>
                    <option value="volvo">ไฟฟ้ารั่ว</option>
                    <option value="saab">น้ำท่วมขัง</option>
                    <option value="fiat">ของแตกเสียหาย</option>
                    <option value="audi">ปัญหาคนจร</option>
                </select>
            </div>
            <div>
                <label htmlFor='area'>แขวงที่เกิดปัญหา</label>
                <select id='area' placeholder=''>
                    <option value="volvo">แขวงa</option>
                    <option value="saab">แขวงb</option>
                    <option value="fiat">แขวงc</option>
                    <option value="audi">แขวงd</option>
                </select>
            </div>
            <div>
                <label htmlFor='reporterName'>ชื่อผู้รายงาน(ถ้ามี)</label>
                <input type='text' id='reporterName' placeholder='' />
            </div>
            <div>
                <label htmlFor='area'>ทีมงานที่รับผิดชอบ</label>
                <select id='area' placeholder=''>
                    <option value="volvo">ทีมA</option>
                    <option value="saab">ทีมB</option>
                    <option value="fiat">ทีมC</option>
                    <option value="audi">ทีมD</option>
                </select>
            </div>
            <div>
                <label htmlFor='ps'>หมายเหตุ</label>
                <input type='text' id='ps' placeholder='' />
            </div>
            <div>
                <label htmlFor='severity'>ความเร่งด่วน</label>
                <select id='severity' placeholder=''>
                    <option value="volvo">วิกฤติ</option>
                    <option value="saab">ด่วน</option>
                    <option value="fiat">ต้องรีบแก้ไข</option>
                    <option value="audi">ปัญหาทั่วไป</option>
                </select>
            </div>
            <h2>ภาพประกอบ</h2>
            <div>
                <p>ก่อนแก้ไข</p>
                <button>อัพโหลดใหม่</button>

                <img src='https://qph.cf2.quoracdn.net/main-qimg-782d8891619f0b7b1b8e51002198baee-pjlq' />
            </div>
            <div>
                <p>หลังแก้ไข</p>
                <button>อัพโหลดใหม่</button>

                <img src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgWFRYYGBgaGRgYGBocGhgYGBgYGBgZGhoZGRocIS4lHB4rIRkaJjomKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjQsJSw0NDQ0NzY0NDY2NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQxNDQ0NDQ0NDQxNDQ0NDQ0NP/AABEIAKgBLAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAAIDBAYBB//EAEIQAAIAAwUEBwYFAgUDBQAAAAECAAMRBBIhMVEFQWGRBhMiUnGBoRQyQmKSsRXB0eHwcoIjQ1Oi8RYz0gdUssLy/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAECBAMFBv/EACsRAAICAgIBAgYBBQEAAAAAAAABAhEDIRIxBBNRIjJBYXGBoQUUkbHBQv/aAAwDAQACEQMRAD8At7O2Oqqpbxh1usisaj3R94NbQeguigijav8At0qI1xikjg3bM89iqSd0X9mbOSWrMc4kZQErUflFfaNtCoApGIxgb47Y6vQJ2jaKsRugU6A7okmTanMRDe8Ixzk5M0RikhwljQekdCeEMvmFUxIx92F/N0MutHRLMFASqw/lIkWYoiBZDRntt2ztXEaoXFiDm2gI0/mUNIGy7tTb4oVk1BrQvhkO7468OMSbM6T5LPX+9R/8l/Mcoy8KHxQrZ6NK2kje6K6Uu4jUY5Q1J7AkYkbrwp5VH7xhbFbDLI3rXFa08wdxjdbMdZqq6slK5MQCCMwyxi8meTHuPXubvFx48mpd+wkYglgKY1ocjX964wlnqGLEUUmhqMiFGP3EGlsSVJGRFCMxjQ1HKKtqsP8AhhaVN7nU4fZYxR8qSe/ezbLxIta7qimtpQ7qHSHiYmkUJtlN9hvvHzoanyjoktu+8epimpxUkeVlg4ScWERQ7oeF4QLKOMvvDS07Q8/3jocwuF4QrsBTMnfNz/eOddO48xAAbuwqQDM2bqeccM6bqYBB0QoAdfN1McNom94w6HYfMI0jPG0Te8Y4LRM7xgodh80iMgQJW0PqYnSe8FCLrINIYZUMSe2kWZc492FQWQGRHPZfCCUub8gi5LYdwekHELAQsh4R32Q8I0igdxfSFdHcX0g4hZNt1iJtBuFIo252a4gJjS7QUF2bj6RTss1L4qdY3WzKkqBT2akqhOtYzFqKHAscI2u1JqoCNYxtpZKnGOWaX0OmJfUo3JfePrHQJPeMOYprEbKmsZjqSgyO8fWI59qs6CpY0rTAExEZaa+kBNtTkJCLWqnHTIUpz9IaBhOzbcknBwyHX3h6YjlD7Rt2SvuBnP0r5k/kIy0KKUUTyLdt2lMm+81F7owXz184qQoUOhWKFChQgFCpCjoEABTZO3Z1nPZaq70apXy0Ph6we/66P+iB/fe/IRmJFkvZsPAEExbSxoN1fHH9o5T8bHN3JbO8PJywVRegjM6Qq7E3VBNcO1v9IuytsJTFKDg1fuBFfYmyHtL3Ja0AFXYCoRd1abzuHjoY07dHXlzpapLVpRBEwuhd3ahNa3Ddp2aUI3xUccMeooUpzybkwXK2jJbO8viuHMVEWG6vU+sX7f0Yln3C0tjkD2lPk2PIw+x7Ad2INABvU1JHmKL58oXIcopVQJYJqfWI2ubqxqLTsRU/yAyj4i1T4jE+pBgRaLQl5VuB0pUkKodDoCOw/hXxgsmgUWXdWI2fxgkiKSewBnTPGjYZ+7UGu+lCNCbQkJpDEATM8YaXPGNKllQ7osJYU0EOhWZG82hh6I53GNmlhl92JksyDJBFKInIx6WZ9DFmVZH0PKNctnByUco57E3hFqCI5Mz6WBuPKLKbNfcINLZOJiRbOB/yYrivYXJ+4JTZj7/yiwlipmSOUFJZQZ0i0lrljO7FKEROUgOJA7zchC9mHePKDgt8n5Yd7bJ+XnBxj7CuQJtDuSQd2UBZ0lr5pUHONXbJD4EKKHOB1pWar1uCm44R1b0RFIFWmSXuk5xnLfs5rxjczOtFCEUgmKtpeZX/ALaxwy2zrDRhvw5oX4c0a57TNH+Uv88oYNoTB/lJ/PKM9HUx9ukdVLZ2+EcycAOZEYtmJJJzOJ8TG26ebdLqtnoqkMHe7mKA3VPOtOAjEQ0JihQoUUSKFCiWTZmbIYanKKAihRf9jRfeYk6D8hnEb2bAkLdA3s2PIQqAqgQ9JDH4TyMWpZKpeW8DxBIPluHGHStoj4hTiMRygoVksuxqB2lBPnT1iwiAYAU4CGpNVvdIMXtnSrz109WOQ/mkNtJWXCLlJIu7KtNpkA9U7JeNWHZIJpTEMCMoM2fptaUNHEuZuxUqxPAqQP8AbEtk6N2maMFEtT8T1BpwT3q+NIObM6KrJJIulxk7Yk1GN0U7ONR+ZjPd9m+axxVR2Ps+32dAZ9mKnMCpelMjigC88IuyNv2clUU3Sc63UCnQmufhWILBsieqATZiO9TVlBQEE4ClNwwgBb7ZNkhkmmU828boSpVENLt+98XDw8ykzM3Ww90r2wkqWZfvTHAou4LXN+BpSm/nAHZdoDpWaqqT7uFLy96h3cd8LY/RibNJecjAVqFais9QDU6LuoaZbgMdd+DvMCpMoVXtANRqGlKVzOFd+/wi0q0S97M+vVk0FCdAKk+Qh09LlKpSuShS7ka0XIYZ5RrbNsqXKxCrWufZAHlAza6C+AL4DgnrFNAGStQ2mAHlFKNsnoz6MoarEjD3WoDjqKCnr4xdQg5KT5QMTbjAUJJGn7nGOHb53ACOqgl2zi5t9I0EqXqoHiRFhbgzI8sYyp22u9qw5ekSjKLSiiW5GuSZLG88ok9qlLmGPlGOXpAvGJh0gQ6xVxJ2al9sIMkY+QiE7YByltyjOPtofCIrPtx9xpCcqGkag2+v+U/KJpVoc5Sm8wIxf/UE0fGYlTpHN/1CISmh8WbZJTnNKf2iJ/ZD3V5RiU2/P/8AcGH/APUNp/1xyiuaJcWbB3vph7wGUCEtj4q6+sE2Kh7ynCOFEetKAx0VEbQD9vdSVYGm4xDaLa1QuuR1gu8lCCrQHttgugjErmCKYQSiq6HGTvsHWzaMxMCPCM/tbpDPRSVUVyvHG7XfTfGkdEYXXYnQ4VjLdMLCvVqVNSH9CG/aMs4btHeMvcxTuWJZiSSSSTiSTmSY5HWWkciBijhMdMbjr7gRJKIqNLlvc6uW5N9FYh2YVY451HlA3RUIOTpGMkMAfdvHcN3LfBSUHPvUHAfrG8rYrOf8CySZjuqO7TCZyoXUN1aLgAFruyy3QM6VWWSUk2iQglCYXSZLX3EeXdNU0BDg08OMOMldDnilFKTWjNgRVn1c3AaKPfP2EdtNop2VxY4eEa7odsQhBNIVq1CVzqDRnx31BA8IcnRzSsH7M6M2iYoKoVXczkgniAcTypGisvRRVUXpEt23sRWp/uJpF22W5ZfvuK90NebkMvOKcu3zXRpio1y8JafFVzQm8DwIAFKVbPChnsptRTY17JIQYSUYXrnYVW7ZFbmGZpXD9onFklyGQ9UJbOSFAvCYTgKKEJPCg0jY7P2YJcuWhoWQl2bMl2Vg5BOIPaIrnSLi2dQ1+napQcBSlAN0eVk/qUU6ir2/2XCL7Zh220UdkUT3ZCVYI7uARmD2sCDUeUQp0qYkAB6b+2SfIb+caXpFYZk1GTrOrU9z3iN4xGZjAbbsaWa6qTascbpCrRce0zM1cThTxjT4vkRyremVJSStB6btOfMN1HdV3veZTx+LD7+ETWDZ1nQhmer1reN5MTvDBqV41rGakbaLKqgKWAFQpvA0w3CE1rmGtFzPdbDnGp60jTHHiat2/wAG+aq+7ePjNf8AQwNtm1Qh7bsrDGgmMSPJanmKRnZS2uYgC37mQ7SIKV8QSIfZuj7k0dlTfQVY/kBzMcfVcfmkv0S8Kk/gi/2aGydKC5udYQxwW+iXW4Gm8+IiG0EuzhwFLlSQGoGuAgBRgLorlnXE0hli2TKTEISwyZ6MfEDIcgY50gsqzJJU6gg91txHgY4Lyanro7vxW8e9P7f9GtsxTu9YhbY6aesZrZO0XQqbzKA111BwFDRsDhGytSTBS5MAJNBflhhXdUrSnrGrJkjBq/qYseGU02l0DjsZO76wxtjp3TziO0221oaPcFcjdJB8DX94g/E7Qd6fSf1ilJNWiJQcXTRYOylHwHmIYdnDuHmIYNoWjVPp/eHLbJ57n0/vDsVC9gPdPMRxtnMfhPOJlnzjvXlEyPN1XlBYqKH4O5+H1jq7DfQc4Kp1mq8omUPqIQwUmwn0HOH/AIE/DnBhS+ojt59R6wAUbPt5w1DisFUtt7FTSAdp2a/vIh8onsSzRgUYeUb45FdMyyx6tBJ7e4NGNRqM4tWbaDZVDDkRFVLO7ZoeUOk2Bw1QCPER05IjiyxbbMXWqOUfd2RQxl9vWS0Mlx+1jXClMN+XGNvZ3dcChPlFTa5TsllZa1GmWMJKMnQm5RR4xabHQ0IoYpNZjWPTLfsyQ5qa+WcCLV0bknFJxB0aIng9ioZl9TEixucAKxuZcoyrNIE4IZjS7wNCCsi9SUDQ0ZzdPapULdG8xWsux3vXFZBWvaJzIyWu4nIZCDDbMd7gmo1VVUUsKAKgNBiMaY8Y4TxNKjX481ysBTLcB7oLeH7YxW2jOnTpctCElqhmFTU326y7W8ASPhGOdABwjfbL6Ko6s17sqaGlASaVpwGMC9vbPRHoigBlOHFMjERwuuR2z+VFvg9/6MbYrAss3h221YAr5IfzgnNt0woELlUApdWiIBpRaCkMWQSRjSG2iWhIUAO+4Xbx8AIaiZmyOzW+Sha9LaZ2TcVWKJfqKF2HaK0r7tDiMY9N6GzVnWSWWRFarMyKt1VImu0tgpqfdVGBJNc6mPM32VP3SmHlHoPQOY6Wa45ZyGFxABUX7zBEJoGwF7PC8RXCMX9Qv0Wo9toqHezXQoHLtqz1utMVG7systsM8HoT5Q63W5VR2DhbihycKXKVLVyK0xrwj530Zp000d1s5tCShNS11qb60MefdMNlSWV53aExQBUMbrNgES6Qak4UCgcSIIW/pgrsEkgz3rhhcQaktStKbwKcY7tglbPMdnapTBpdKqDQkKWNCOOBoTSPT8fHPE4tnSk4tdnnFhJDgeII8v2g0SdTzNIEbJQ3q0yGenAQWj20jIpNdMOdHtplGEpz2GwSvwtuHgfv4xqo8wnJMzVx4EfmI2GyukCtKHWEdaBQqDi7DCo8c+FYweVg3yivyel4fka4TfXQSttru1AzoB5t+gFfMaxzaD0QDeaegrAoAklmPabPQV0ie0TbxzwXAeA3niYy8Ko187sx7MOtnqMr5Pmc/WPQ1BdEO/sMfSseZWF785z3y3+58PvHqMuX2FGIoBlhQ0jT5eoxRl8JXKTOzlRuw1DXceGh1ii9kCkDMHLAXvAjf4jz1i8rV7JwYY8D8w4cP2MC/ab05ccK0H9OX3MZ8U5RejTmxxmtiHV3ilQHGJUijU1ocacYdcXX0i7O2PLtcxJbsUftFWWl5aKTjXNa008RGKl7TtCFlJLBKhzS9dAa7UvTKtBU6iPRwt5I8jyc0PSnxs1F0R29SA9m2kXGDmu8XRURaW0aseQimcy+JxhwtR0iqs1d5bkIkWYnzcoNhROLUdI77WdIjExNH+mHdYnz/TCthRWs+2HX4vSCSbZVvewOoAjOiyfOn1Q4SgPiT6hFKTQOKZpDbSfdf0EOW2vvcxnVA7yfWIkD/Mn1iOimTxNNKtbf6lID9KbU9xKTAe0ftFG/8yfWsA+lZPU3gy9l1JowJoarkOJEXDKk7OcoNoa1tmd4GKk63TdRGbNpbWGGcx3xbzshYkHXt83vCD+wLU9CxcVIAFcaAn9vURh7OpdgN2Z8IO2eYykXTvrTcd32iJTlJHbEoxknI9M2ZtK4KVqDnr5QA29tF3Y3ZYpWik4kLTHEYCta+QgO21iDQDicamngIbadtywKlgDpmf5xiXlko0zV6GCcnJOhdQWGLqOC4+sPsoZD2GKrvukK7D+oCoigdqFsQopqe19o41sJ3gedD945OUmdowwLrZope0ygAuuRv7ZZuJ7XvHxMTL0llIQyPNR0N9A0sFQbqijLexBu03UBw1jKi0HMMedYinzy1KsCPLOEtvZGbHBRuP8Ag39imTpaO86U1oE0h1CXHDX7zA3WIJBrxpSKdksVpmhCB1SJUC92i0lgaoyVoVvLRWrhUjdHehnSUKq2eYCTW6jVAF34Ux31JA1qBGo2ntGXLls0wsgqVF8FSSR8NMSMTlEZLemvwcoRjpp/kzNlssqzC6outLV2d6VrRRRyTXAV8BWMJtja72lu0FoGYp2aMAzEhTjjmILba2285iEJRKFaVvMwOZLMKrXQUyEBllgEEDEYiLhirbIyZE/hj0X7NICKF58TFqXZXfFQbtcWoKDzYgRWSep3gHQxpdk7YuyghT3b111IxDUrxBwz9I6t0iI/gG/gU26XF8qN6hHH+2sDgMMY0W1OkzojXRUsd5F5zgMaDIaCmWeMYwWic+QpXfdp94UfyDf0oKJMK5MR4Ej0EWJm0nEtxS810hSM6kUxG/yijZ5F0YmrHMnf+0S1hSxxfaHHJOPTIuh9jLz73woKk7sd3KvpHocpySx3YYaHThhd86wN2Ds4pKJICs7XzhuoAAw4gV88YMKgAp/K518ax5fkT5Tf20ex4uJwgvvsgtqVQkYMoLKfAYjwIw/4gBZm7d/cCKccif0g5tOddQ6tgBAWUj9lQtSTTA5nXw3nzhQVorK0nYc2Jagkw2hzQKHr4JJeY3lgvKA//ptKvz5hYVqiKwOIN6ajkEf0y35RT6Y7QEiWlnQ9tlLOdFJxJHzdsU0rFrobaHk2Z5tAGme4aY1oUSnhefHSYdI9SCUMdHj5JOeRv3L77NkgBkVFOCAhRdbGgqBrr94hTZzlagy66AGn1ftE0uW3UqFxuNUD+nKJbPMuuCMUmEkfK+8H1/gjzfVkrpnq+hjlVr6FFNnzzuQeJP5AxJ+HTu8nNv8AxguAa54bhTLzh0L+4mC8TF9zN2wzJVL9KHAEGo/Ucor+3/NGlm2RJjXXUMLopmM2xoQajIcowc26zMUqFvMALxNAGNBXfhTGNmGTmrZg8nH6cqQQa1S9DyiF7RJ7p5QUeWnff6ViB0l/6j/SkdTODTaJPdPKOe0Su6eUWnWV/qTPpSK7mV35n0rABH7RL7p5RDbJiMjoBQlSBwO71pEjNL77/SsQsZfefkIAMnCi1tGUFc3a3TiK8c/WK0WQTyZlBdX3mNCdBWgAg2rhBqclH5xR2Hsl5zFwVREIvzGNEBOSimLMdB6RqrP0cRqlLUrMBWjy3lqfBiT9o6QQpJ1oz0okMa4kgk8xFPaUuovDdn4GNbZrHYlY9b18xrovFCiIh33Awq1NTgYrdItjJIMtkczJM9L8tmF16YBkcd4VHPKFKSbofCUUm12ZSXIe6HRs8xvrv4GJZdvIwccs/MQ+xi4zIf6h4fykWZkpW94VhJAKTNB7St5g0PnEzPXMA8aUPp+cD2sBBqjUPH9YmlTXGDr/AHDEedMoKvsak0qTLPZ31HkG/MQ92vGpe8aUF6/WmlaHCIoUFByXsh3Vk5UPgwJ5Z+kNoa0OB84Rhwc5VqNDiPIHLyh7D4X9hXeMK5xP88I7fG/DwxHI4+vlG96G7Dszok15buzBsXCmUGRrpCpv4XhuOUEpxiraKhjcnpgno/YJaSJk60S+ySlyo7RGVV30JYDTCuUANqSy7s0vsKckBagA47yc49dt2zpDIyOoCsCKCo8CAMLwNCDTCgjzq1bFmKxCDrFFe0v2I73AVjms0H3ot4JrpWALPZHHvOaaA/mYMWCyZNd7I90a8c6051+5bZmwaUefQDdLzqfmpn/SP2g1abUEFaU0Jw5DPnT8oy5vJXyx39zVg8V/NPX2KVg62YKs7IAcQAa82FMtNYuPa1QqiVdybqitST4k4wFtFumTVpIeXjXsmYiv43WpXzp4RXfZsy9dmC52VZiSGLBsQAQSKREPGc/ilpHSflqHwx2/cto7TGdnoQDdShwFK1ZTyx8eMSymKYqxDZE9kkjShFB5CKrKVFAwoIrzHbvRpUIx6RilklK+T7Kdo2MjzTMd2erXnViBf+W8tLoyGAyFIL2m3BwqlbiJ7qoeyuFK1WhOGAwFAYFPObWIGntDkuSpsUXxd0abZlqIN1WDKcq0wOlRlyMEZky77xlpjWpNanXG7jGFZ2O4QgzaCMz8a3dmuPm0qr+TbC2Kcp0o8v8AziVXY0pcbwYj7Axhg78I6EY7hCfir3GvO+38m0tNtMoq7oaGq9kg4kgj3qaGPN7ZZmEx6I1CzFcD7pYkZGmUGFR4f1b6xoxQ4KjPmy+q7onaW+hiNpL90xZKnT1EMYN3R9Q/WLOJTezv3TEbWZtIulX7g+ofrHOqmdxfqH6wAUDZzpEZs50EFBZpncX6h+sL2Sb3F+ofrABn9pWBnSoGK4jjqP5pGdj0IWSb3EH9wP8A9ozu0dgTPaJaKAOuai091WqL3kAb3OGiZIKSkuyrMi+71QmeLzGa8x44BfKDiSbsusRdTZwEly2c9RVKsK3xUkkEaNXA0GOEXtoGknDxjtGNJs7J6SMnMf3uP6wdtFtsc2z2SXMSeTJvKzK6rS+avdU1DbiK0jPTM4QbCnGsZ7aejXKEZJKQ7pBssSZiFGvo4LyXyLy60IYbnG8eGVaCnFnpFaysuySz7yCdMI0Wc63a+IStOI1iuMY7RdnmTVNpCEdhQooRyFSOw7qzWhwpu3wm0uyoxcnSIzHVUnIfkIlVAIfHN5PY1R8Vf+mMSXTiY2nQyewluFdgQ/u1qFBVTgrVAqa4gRkrPKLsFGZ9BvJ4RsrPPly0VEot3JrpvEnMtrXeP0FOORSlHT2ducMbSrQVm3m996jfTsg/1EknyFIie1IuAZcMKVAC+JyX78IozNsLShz30rQ+RUwInWpS1bqU8Gr9sIx+lkl8xo/uMUdRYYm7QHwUdu+cEUaKM2/PWKBUs15iWbd46KN33iqloQ1rVfAtQ8odI2lcJZApb4b94gccDmf5vio4ndURLPGrbKHTWyogkC6oe7MLkAVoWUrUjOhLAeBgPZtrTUCqpUKMLt1aHxoK+sWNpo8x2mz5ig4ZBiKDJVGFBw/eA4rvjfFUqPNm+Um0H5PSIE9tCF1U1I40IxH8xgx2GAINQQCDwPlGJArgBid36RqrG9xFU5gAHCB6Eiw0teMRGQIf1v8AKR2//KQrGQ9QI77OIlrx9IVOMAUQ9QI71Q4xJc4mGmXxPMwWAyijWF1i8f55x0yRqeZhvs66tzMAFp7DxiB9n/NFlntB3mI29p1P88oBFRtnfNDRYB34tFLTqf55RwSLTqf55QAQiwL34cdnp34sLZbRvJ5/tEi2Wbv+4/SACotgTvxZs8lUZXUhmSpXxKlTTjRjEy2V94Pp+kTSbBUj9v0hpgRbM2eoQAzpIbDs9ZUjgSAQDwrF7pJI6uWFqDguIyxFcDvHGGWnZHVspUYOa/3fF+vnEe3bdKdElzHEt1FFZgxRl3BioJUjXKNso1jtHKGdvJUjJPnE9rmS7OkuY6mY0xWZE92Wt1rtZhrVxX4RQHeYlWzSQb0y12dUGJuOXc8FQLn/ACkZ3bu0hPmXkW7LRRLlKcwi1pX5jUk+MYlH6s25cyqosp2u0tMdncks5qx4/kNwG4CL1gm1Wm9cPLdAuJrLNuMDuyPhFp0ZGGo4THKw5RTMYnfmPCL1dCUW1aQYsdlCAHNiMTpwGgh1oswehyPDSIkt63ccxu18Ils1ov4bwASch5RdJqgUmnaKVosxTGtRyp4xATB6zWV57iTLUu7DEZKo7zt8I9dKxK3RhpTFJwe+O4AyEd5CfeB18qCOE4pPRrhnfF8uyls+0pLGfaPvH8hwi8u1E1iM7IQfDNP9g/WG+wIPgmfR+8RRxbbdssfiKHf6CGtakO8chEHs8sZy3+n94kUye4w8RCoDvtCcPSHCah09I6ryh8J5Q/r5Q3QUBX2xY1CSpim8rg7qKrClQNcCRX5GyjKvZWv3FFSfd0pqTup+Ua9bcFR5QVHlvit8sDKYmtVujtY1IFRSrZ1MNsTSZYwN5jmxzP6DhDTBpPods7ZyS0CihPxMc2P6cIIpIHy8ogFvl6iF+IJqIACEuzcU5CLC2U6p6QH/ABFNRC/EVgAPLZzqnpHRJ4p6QA/EFhe3rABoOqGq+kMaUPlgH7esL29NYADDSV+WI/Zk0EDPxBNYX4gmsAUWhLl/NDlSX88Vbr90xy6/dMIC+qy/n9IcFl6v6QNpN7hjv+L3DAMJUTV/SHVTV/SBdZ3cb0jt6f3D6QCCJC6tEkoCopX0gUHn9z7QQ2ak4uCVw8BFwjbFJ0jQTrKHlkbwKrwbd/OMeV9LEq54D1rHqvWOFbDfHnnTazEFphGDUB/q/eNvUGjJVys86mZmGxLMQxFGRndChQo6iFiFGZNBCGF9mOWXH4cK66cv0i8RWGyJQRQo3fwmHxzbtno44cY0RstPD7RNY3e9dQXmbAAYmvCOKpJoBUwZ2dKCYkKzHea0A0UfnHSORpUZ82KKdp/o2vQbZ3UXQ9L73mffiQaLXfQetY19usSTkuvX5WBoynVT/Ad8eb2XasxSMmGlTUeDYnnXyjU7L6SBqK1TwbB/I5NFNqRnqgPtOwzZDXXLFT7rgkK3DE9luHKsU6E7z9X7x6HWXPQqaOpwIOY04g6HlGQ2vsWZJN5AzpqKll4OBu+YYa0383EakCHkk/8A6ivMsdf+REpm4Z+sN62JooqmxHUc4jbZ7ajnF3rsboBZqE3VFTQYk8BhmaCGJaqtdIANxHFGDCjgGlRvFRDoCg2z34RE1hfhBctDCYQAg2N+EcNlfhBRoiaACgZLQ0y2i25iB2gAjFYV6I3c6GK7TToYYFsvHLwiiZraGOX30MCCy6SIZURUuvpHOqeALNIdsTNFiNtuTR8K+sKFAIjbpDOHwryMRN0mn91ORhQoAOL0mtB3JyMKd0ktA3J9J/WOwopdCFY+kNoY/D9P7xrNnbRm0JN3BanCFCjTgijhmbL9p2o4VAKVYVyjH7a2nMmKyNdKsSCKcqcRnChR2yLRyg3ZlJ9hopwxrAGYtCYUKM2RLR3iNgpsiz5ufBfzP5c4UKOEujTgScthSI3emWJ/mcKFEI2ZW0tEKltTjnSoiZAN5bmYUKKML29lmWB83MxbSmp5woUAGh2N0jeSRfcso3nFwOPfHr9o9LsNsWagdKGorQEeh0O4woUWRI8ht955jvMDK7OxcVIoxOIpupl5RTmC6VFSbxpQnDU+kKFGhRRNh/o2hHXFFBbqzvQfEpJJfDcM6eIzgHaLUXdnW9Q0Vahj2VUKuZJrRQcziTHIUZ5fMy10hCc/HkYervx5R2FEFDgXjt14UKABplvDWlNHYUAETSfGGdSOMKFAAuqHGHBF0hQoAJFVYddWFCgA/9k=' />
            </div>

            <button style={{
                width: '400px',
                height: '80px',
                marginTop: '20px',
                borderRadius: '8px',
                backgroundColor: 'crimson',
                fontSize: '30px',
            }}>บันทึก</button>
        </div>
    )
}

export default IssueForm