import APICallResult from '@/app/interfaces/api-call-result';

async function postImages(
  email: string,
  images: File[]
): Promise<APICallResult> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_BASEURL}/s3-presigned-urls`
  );

  url.searchParams.append('email', email);

  const imageNamesQuery: string = images.map((img: File) => img.name).join(',');
  const contentTypeQuery: string = images
    .map((img: File) => img.type)
    .join(',');
  url.searchParams.append('image_names', imageNamesQuery);
  url.searchParams.append('image_content_types', contentTypeQuery);

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      const presignedUrls = data.presigned_urls;
      for (let i = 0; i < presignedUrls.length; i += 1) {
        const result = await fetch(presignedUrls[i], {
          method: 'PUT',
          headers: {
            'Content-Type': images[i].type,
          },
          body: images[i],
        });
        if (!result) {
          return {
            wasCallSuccessful: false,
            errorMsg:
              "Sorry, we're having issues. We weren't able to get your image onto our servers :/",
          };
        }
      }
    } else {
      return {
        wasCallSuccessful: false,
        errorMsg:
          "Sorry, we're having issues. It looks like there was a problem with the image size of format. Try uploading again.",
      };
    }
  } catch (error) {
    return {
      wasCallSuccessful: false,
      errorMsg: error,
    };
  }

  return {
    wasCallSuccessful: true,
    errorMsg: '',
  };
}

async function fetchImages(userEmail: string) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASEURL}/images`);
  url.searchParams.append('email', userEmail);

  const params: { [key: string]: string } = {
    email: userEmail,
  };

  console.log(url.toString());

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error('Error occurred when fetching posts');
  }
  return res.json();
}

export { postImages, fetchImages };
