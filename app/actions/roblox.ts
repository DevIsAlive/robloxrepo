"use server"

interface RobloxUser {
  id: number
  name: string
  displayName: string
}

interface RobloxHeadshot {
  targetId: number
  state: string
  imageUrl: string
}

export async function getRobloxUserHeadshot(
  username: string,
): Promise<{ success: boolean; headshotUrl?: string; error?: string }> {
  if (!username) {
    return { success: false, error: "Username cannot be empty." }
  }

  try {
    // Step 1: Get User ID from Username
    const userResponse = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        usernames: [username],
        excludeBannedUsers: true,
      }),
    })

    if (!userResponse.ok) {
      const errorData = await userResponse.json()
      console.error("Roblox User API Error:", errorData)
      return {
        success: false,
        error: `Failed to fetch user ID: ${errorData.errors?.[0]?.message || userResponse.statusText}`,
      }
    }

    const userData = await userResponse.json()
    const user: RobloxUser | undefined = userData.data?.[0]

    if (!user) {
      return { success: false, error: "Roblox user not found." }
    }

    const userId = user.id

    // Step 2: Get Headshot URL from User ID
    // CORRECTED: Changed size from 96x96 to 100x100, which is a valid Roblox thumbnail size.
    const headshotResponse = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=100x100&format=Png&isCircular=false`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    )

    if (!headshotResponse.ok) {
      const errorData = await headshotResponse.json()
      console.error("Roblox Headshot API Error:", errorData)
      return {
        success: false,
        error: `Failed to fetch headshot: ${errorData.errors?.[0]?.message || headshotResponse.statusText}`,
      }
    }

    const headshotData = await headshotResponse.json()
    const headshot: RobloxHeadshot | undefined = headshotData.data?.[0]

    if (headshot && headshot.state === "Completed") {
      return { success: true, headshotUrl: headshot.imageUrl }
    } else {
      return { success: false, error: "Headshot not available or still processing." }
    }
  } catch (error) {
    console.error("Error in getRobloxUserHeadshot:", error)
    return { success: false, error: "An unexpected error occurred while fetching Roblox data." }
  }
}
