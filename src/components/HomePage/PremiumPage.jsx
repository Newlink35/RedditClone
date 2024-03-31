import { Box, Button, Flex, Image, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import Footer from '../../Footer/Footer'

function PremiumPage() {
    const { colorMode } = useColorMode();


    return (
        <>
            <Flex
                direction="column"
                height="auto"

                bg={colorMode === 'dark' ? "#1A1A1B" : "white"}>
                <Box
                    bgImage="linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 50%), url('https://www.redditstatic.com/desktop2x/img/gold/premium-marketing/premiumHero.jpg')"
                    backgroundSize="cover"
                    height="544px"
                    width="100%"
                    p="100px 0px 0px"
                >
                    <Flex width="85%"
                        maxWidth="1440px"
                        direction="column"
                        margin="0 auto">
                        <Text marginTop={0}
                            marginBottom="12px">
                            <Image
                                maxWidth="558px"
                                height="auto" src='/images/redditPremiumH1Image.png' />
                        </Text>
                        <Text
                            color="white"
                            fontWeight={700}
                            maxWidth="500px"
                            marginTop={0}
                            marginBottom="24px"
                            fontFamily="Noto Sans, sans-serif"
                            fontSize="18px"
                            lineHeight="28px">Help support Reddit and get VIP treatment and exclusive access.
                        </Text>
                        <Flex textAlign="center">
                            <Button
                                variant="outline"
                                borderRadius="10px"
                                borderColor="#fff"
                                color="#fff"
                                width="256px"
                                height="42px">
                                $5.99/Month
                            </Button>

                            <Button
                                borderColor="#fff"
                                borderRadius="10px"
                                bg="#F64A4C"
                                color="#fff"
                                width="256px"
                                marginLeft="10px"
                                height="42px">
                                $49.99/Year
                                <Text
                                    p="4px 8px"
                                    background="white"
                                    color="red"
                                    marginLeft="4px"
                                    fontSize="12px"
                                    borderRadius="999px"
                                    lineHeight="16px">Save 30%</Text>
                            </Button>

                        </Flex>
                        <Flex
                            marginTop="16px"
                            color="#d3d6da"
                            fontSize="13px"
                            textAlign="left">
                            Subscription automatically renew
                        </Flex>
                    </Flex>
                </Box >


                <Flex
                    marginTop="28px"
                    fontSize="32px"
                    fontWeight={700}
                    direction="column"
                    justifyContent="center"
                    alignItems="center">
                    <Text
                        textAlign="center"
                        marginBottom="28px">Join Reddit Premium Today
                    </Text>
                    <Flex
                        textAlign="center"
                        alignItems="center"
                        justifyContent="center"
                        boxSizing='border-box'
                        padding="0 16px"
                        marginBottom="30px"
                        maxWidth="800px">
                        <Flex
                            justifyContent="center"
                            gap="20px"
                            boxSizing='border-box'>
                            <Flex
                                direction="column"
                                width="180px"
                                minHeight="128px"
                                borderRadius="16px"
                                bg={colorMode === "dark" ? "#272729" : "#F6F7F8"}
                                p="8px 8px 12px">
                                <Flex
                                    width="48px"
                                    height="48px"
                                    margin="0 auto 8px"
                                    backgroundPosition="50%"
                                    backgroundSize="contain"
                                    backgroundRepeat="no-repeat"
                                    bgImage={`url("https://www.redditstatic.com/desktop2x/img/gold/premium-marketing/benefits-icons/premium-ad-free.png")`}
                                >
                                </Flex>
                                <Text
                                    marginBottom="4px"
                                    fontSize="14px"
                                    fontWeight={700}
                                    lineHeight="18px">ad-free Browsing
                                </Text>

                                <Text
                                    color="#878a8c"
                                    fontSize="12px"
                                    lineHeight="18px"
                                >Enjoy redditing without interruptions from ads</Text>
                            </Flex>

                            <Flex
                                direction="column"
                                width="180px"
                                minHeight="128px"
                                borderRadius="16px"
                                bg={colorMode === "dark" ? "#272729" : "#F6F7F8"}
                                p="8px 8px 12px">
                                <Flex
                                    width="48px"
                                    height="48px"
                                    margin="0 auto 8px"
                                    backgroundPosition="50%"
                                    backgroundSize="contain"
                                    backgroundRepeat="no-repeat"
                                    bgImage={`https://www.redditstatic.com/desktop2x/img/gold/premium-marketing/benefits-icons/premium-avatars.png`}
                                >
                                </Flex>
                                <Text
                                    marginBottom="4px"
                                    fontSize="14px"
                                    fontWeight={700}
                                    lineHeight="18px">Exclusive Avatar Gear
                                </Text>

                                <Text
                                    color="#878a8c"
                                    fontSize="12px"
                                    lineHeight="18px"
                                >Outfit your avatar with the best gear and accessories</Text>
                            </Flex>

                            <Flex
                                direction="column"
                                width="180px"
                                minHeight="128px"
                                borderRadius="16px"
                                bg={colorMode === "dark" ? "#272729" : "#F6F7F8"}
                                p="8px 8px 12px">
                                <Flex
                                    width="48px"
                                    height="48px"
                                    margin="0 auto 8px"
                                    backgroundPosition="50%"
                                    backgroundSize="contain"
                                    backgroundRepeat="no-repeat"
                                    bgImage={`url("https://www.redditstatic.com/desktop2x/img/gold/premium-marketing/benefits-icons/premium-lounge.png")`}
                                >
                                </Flex>
                                <Text
                                    marginBottom="4px"
                                    fontSize="14px"
                                    fontWeight={700}
                                    lineHeight="18px">Members Lounge
                                </Text>

                                <Text
                                    color="#878a8c"
                                    fontSize="12px"
                                    lineHeight="18px"
                                >Discover all the illuminati secrets in r/lounge</Text>
                            </Flex>


                            <Flex
                                direction="column"
                                width="180px"
                                minHeight="128px"
                                borderRadius="16px"
                                bg={colorMode === "dark" ? "#272729" : "#F6F7F8"}
                                p="8px 8px 12px">
                                <Flex
                                    width="48px"
                                    height="48px"
                                    margin="0 auto 8px"
                                    backgroundPosition="50%"
                                    backgroundSize="contain"
                                    backgroundRepeat="no-repeat"
                                    bgImage={`url("https://www.redditstatic.com/desktop2x/img/gold/premium-marketing/benefits-icons/premium-app-icons.png")`}
                                >
                                </Flex>
                                <Text
                                    marginBottom="4px"
                                    fontSize="14px"
                                    fontWeight={700}
                                    lineHeight="18px">Custom App Icons*
                                </Text>

                                <Text
                                    color="#878a8c"
                                    fontSize="12px"
                                    lineHeight="18px"
                                >Change your app icon to something more your style
                                </Text>
                            </Flex>
                        </Flex>

                    </Flex>
                    <Flex gap="10px">
                        <Button
                            variant="outline"
                            height="42px"
                            fontSize="14px"
                            minWidth="256px"
                            maxWidth="360px"
                            borderColor="#ff4500"
                            borderRadius="10px"
                            color="red">
                            $5.99/Month
                        </Button>

                        <Button
                            borderColor="#fff"
                            borderRadius="10px"
                            bg="#F64A4C"
                            color="#fff"
                            width="256px"
                            marginLeft="10px"
                            height="42px">
                            $49.99/Year
                            <Text
                                p="4px 8px"
                                background="white"
                                color="red"
                                marginLeft="4px"
                                fontSize="12px"
                                borderRadius="999px"
                                lineHeight="16px">Save 30%</Text>
                        </Button>
                    </Flex>

                    <Flex
                        direction="column"
                        color="#7c7c7c"
                        marginTop="12px"
                        textAlign="center"
                        fontSize="12px"
                        lineHeight="18px"
                    >
                        Subscriptions automatically renew
                    </Flex>

                    <Flex
                        direction="column"
                        color="#7c7c7c"
                        marginTop="12px"
                        textAlign="center"
                        fontSize="12px"
                        lineHeight="18px"
                    >
                        * Custom app icons are only available through a paid Reddit Premium subscription.</Flex>
                </Flex>

                <Flex margin="30px auto 0"
                    color={colorMode === "dark" ? "white" : "black"}
                    textTransform="unset"
                    lineHeight="17px"
                    letterSpacing="unset"
                    fontWeight={700}
                    marginBottom="30px"
                    fontSize="14px">
                    Visit the Reddit Premium FAQs
                </Flex>
            </Flex >


            <Footer />





        </>
    )
}

export default PremiumPage
