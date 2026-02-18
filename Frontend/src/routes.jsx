import {
  HomeIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

import { Home } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
//SOLUTION ROUTES
import SolutionCat from "./pages/solution/SolutionCat";
import SolutionCatForm from "./pages/solutionform/SolutionCatForm";
import SolutionSubCat from "./pages/solution/SolutionSubCat";
import SolutionSubCatForm from "./pages/solutionform/SolutionSubCatForm";

//CMS ROUTES
import AboutUs from "./pages/cms/AboutUs";
import AboutUsForm from "./pages/cmsform/AboutUsForm";
import AboutUsEnterprise from "./pages/cms/AboutUsEnterprise";
import AboutUsEnterpriseForm from "./pages/cmsform/AboutUsEnterpriseForm";
import Solution from "./pages/cms/Solution";
import Footer from "./pages/cms/Footer";
import FooterForm from "./pages/cmsform/FooterForm";
import OurTeam from "./pages/cms/OurTeam";
import OurTeamForm from "./pages/cmsform/OurTeamForm";
import Testimonial from "./pages/cms/Testimonial";
import TestimonialForm from "./pages/cmsform/TestimonialForm";
import Smarter from "./pages/cms/Smarter";
import SmarterForm from "./pages/cmsform/SmarterForm";
import Faq from "./pages/cms/Faq";
import FaqForm from "./pages/cmsform/FaqForm";



//MASTER ROUTES
import SlidesContent from "./pages/master/SlidesContent";
import AddSlidesContent from "./pages/admin/AddSlidesContent";
import WhatSection from "./pages/master/WhatSection";
import WhatSectionForm from "./pages/admin/WhatSectionForm";
import Image from "./pages/master/Image";
import ImageForm from "./pages/admin/ImageForm";
import EmbeddedSection from "./pages/master/EmbeddedSection";
import EmbeddedSectionForm from "./pages/admin/EmbeddedSectionForm";
import NetworkSection from "./pages/master/NetworkSection";
import NetworkSectionForm from "./pages/admin/NetworkSectionForm";
import CloudSection from "./pages/master/CloudSection";
import CloudSectionForm from "./pages/admin/CloudSection";
import ManagementSection from "./pages/master/ManagementSection";
import ManagementSectionForm from "./pages/admin/ManagementSectionForm";
import SupportedContent from "./pages/master/SupportedContent";
import SupportedContentForm from "./pages/admin/SupportedContentForm";
import OfferSection from "./pages/master/OfferSection";
import OfferSectionForm from "./pages/admin/OfferSectionForm";
import EverywhereSlide from "./pages/master/EverywhereSlide";
import EverywhereSlideForm from "./pages/admin/EverywhereSlideForm";
import SolutionForm from "./pages/cmsform/SolutionForm";
import AIPowered from "./pages/cms/AIPowered";
import AIPoweredForm from "./pages/cmsform/AIPoweredForm";
import Faqs from "./pages/master/Faqs";
import FaqsForm from "./pages/admin/FaqsForm";
import AboutUsBenefits from "./pages/cms/AboutUsBenefits";
import AboutUsBenefitsForm from "./pages/cmsform/AboutUsBenefitsForm";










const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        name: "Edit Slide",
        path: "/master/slides-content/edit/:id",
        element: <AddSlidesContent />, // or EditSlide component
      },

      {
        name: "Add Slide",
        path: "/master/slides-content/add",
        element: <AddSlidesContent />,
      },

      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      //SOLUTION CAT
{
  name: "solution category",
  path: "/solution/solution-cat",
  element: <SolutionCat />,
},
{
  path: "/solution/solution-cat/add",
  element: <SolutionCatForm />,
},
{
  path: "/solution/solution-cat/edit/:id",
  element: <SolutionCatForm />,
},
//SOLUTION SUB CAT
{
  name: "solution category",
  path: "/solution/solution-sub-cat",
  element: <SolutionSubCat />,
},
{
  path: "/solution/solution-sub-cat/add",
  element: <SolutionSubCatForm />,
},
{
  path: "/solution/solution-sub-cat/edit/:id",
  element: <SolutionSubCatForm />,
},
      // CMS ROUTES
      //About Us
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "about us",
        path: "/cms/about-us",
        element: <AboutUs />,
      },
      {
        path: "/cms/about-us/add",
        element: <AboutUsForm />,
      },
      {
        path: "/cms/about-us/edit/:id",
        element: <AboutUsForm />,
      },
// ABOUT US ENTERPRISE
{
  icon: <DocumentTextIcon {...icon} />,
  name: "about us enterprise",
  path: "/cms/about-us-enterprise",
  element: <AboutUsEnterprise />,
},
{
  path: "/cms/about-us-enterprise/add",
  element: <AboutUsEnterpriseForm />,
},
{
  path: "/cms/about-us-enterprise/edit/:id",
  element: <AboutUsEnterpriseForm />,
},
//ABOUT US BENEFITS
// ABOUT US ENTERPRISE
{
  icon: <DocumentTextIcon {...icon} />,
  name: "about us enterprise",
  path: "/cms/about-us-benefits",
  element: <AboutUsBenefits />,
},
{
  path: "/cms/about-us-benefits/add",
  element: <AboutUsBenefitsForm/>,
},
{
  path: "/cms/about-us-benefits/edit/:id",
  element: <AboutUsBenefitsForm/>,
},

      //Solution
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "solution",
        path: "/cms/solution",
        element: <Solution />,
      },
      {
        path: "/cms/solution/add",
        element: <SolutionForm />,
      },
      {
        path: "/cms/solution/edit/:id",
        element: <SolutionForm />,
      },
      //FOOTER 
      {
        path: "/cms/footer",
        element: <Footer />,
      },
      {
        path: "/cms/footer/add",
        element: <FooterForm />,
      },
      {
        path: "/cms/footer/edit/:id",
        element: <FooterForm />,
      },
      //FAQ
      {
        path: "/cms/faq",
        element: <Faq />,
      },
      {
        path: "/cms/faq/add",
        element: <FaqForm />,
      },
      {
        path: "/cms/faq/edit/:id",
        element: <FaqForm />,
      },

      //OUR TEAM
      {
        path: "/cms/our-team",
        element: <OurTeam />,
      },
      {
        path: "/cms/our-team/add",
        element: <OurTeamForm />,
      },
      {
        path: "/cms/our-team/edit/:id",
        element: <OurTeamForm />,
      },
      //TESTIMONIAL

      {
        path: "/cms/testimonial",
        element: <Testimonial />,
      },
      {
        path: "/cms/testimonial/add",
        element: <TestimonialForm />,
      },
      {
        path: "/cms/testimonial/edit/:id",
        element: <TestimonialForm />,
      },

      //SMARTER
      {
        path: "/cms/smarter",
        element: <Smarter />,
      },
      {
        path: "/cms/smarter/add",
        element: <SmarterForm />,
      },
      {
        path: "/cms/smarter/edit/:id",
        element: <SmarterForm />,
      },
      //AI POWERED
      {
        path: "/cms/ai-powered",
        element: <AIPowered />,
      },
      {
        path: "/cms/ai-powered/add",
        element: <AIPoweredForm />,
      },
      {
        path: "/cms/ai-powered/edit/:id",
        element: <AIPoweredForm />,
      },
      //CMS FAQ
      {
        path: "/cms/faq",
        element: <Faq />,
      },
      {
        path: "/cms/faq/add",
        element: <FaqForm />,
      },
      {
        path: "/cms/faq/edit/:id",
        element: <FaqForm />,
      },

      // MASTER ROUTES
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "slides-content",
        path: "/master/slides-content",
        element: <SlidesContent />,
      },
      // WHAT SECTION ROUTES
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "what-section",
        path: "/master/what-section",
        element: <WhatSection />,
      },
      {
        name: "Add What Section",
        path: "/master/what-section/add",
        element: <WhatSectionForm />,
      },
      {
        name: "Edit What Section",
        path: "/master/what-section/edit/:id",
        element: <WhatSectionForm />,
      },
      //Image Route
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "image",
        path: "/master/image",
        element: <Image />,
      },
      {
        name: "Add Image",
        path: "/master/image/add",
        element: <ImageForm />,
      },
      {
        name: "Edit Image",
        path: "/master/image/edit/:id",
        element: <ImageForm />,
      },
      //Embedded Section
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "embedded-section",
        path: "/master/embedded-section",
        element: <EmbeddedSection />,
      },
      {
        name: "Add Embedded Section",
        path: "/master/embedded-section/add",
        element: <EmbeddedSectionForm />,
      },
      {
        name: "Edit Embedded Section",
        path: "/master/embedded-section/edit/:id",
        element: <EmbeddedSectionForm />,
      },
      //Network Section
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "network-section",
        path: "/master/network-section",
        element: <NetworkSection />,
      },
      {
        name: "Add Network Section",
        path: "/master/network-section/add",
        element: <NetworkSectionForm />,
      },
      {
        name: "Edit Network Section",
        path: "/master/network-section/edit/:id",
        element: <NetworkSectionForm />,
      },
      //Cloud Section
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "cloud-section",
        path: "/master/cloud-section",
        element: <CloudSection />,
      },
      {
        name: "Add Cloud Section",
        path: "/master/cloud-section/add",
        element: <CloudSectionForm />,
      },
      {
        name: "Edit Cloud Section",
        path: "/master/cloud-section/edit/:id",
        element: <CloudSectionForm />,
      },
      //Management Section
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "management-section",
        path: "/master/management-section",
        element: <ManagementSection />,
      },
      {
        name: "Add Management Section",
        path: "/master/management-section/add",
        element: <ManagementSectionForm />,
      },
      {
        name: "Edit Management Section",
        path: "/master/management-section/edit/:id",
        element: <ManagementSectionForm />,
      },
      //Supported Content Route
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "supported-section",
        path: "/master/supported-section",
        element: <SupportedContent />,
      },
      {
        name: "Add Supported Content",
        path: "/master/supported-content/add",
        element: <SupportedContentForm />,
      },
      {
        name: "Edit Supported Content",
        path: "/master/supported-content/edit/:id",
        element: <SupportedContentForm />,
      },
      //OFFER SECTION
      {
        path: "/master/offer-section",
        element: <OfferSection />,
      },
      {
        path: "/master/offer-section/add",
        element: <OfferSectionForm />,
      },
      {
        path: "/master/offer-section/edit/:id",
        element: <OfferSectionForm />,
      },
      //EverywhereSlideForm
      {
        path: "/master/everywhere-slide",
        element: <EverywhereSlide />,
      },
      {
        path: "/master/everywhere-slide/add",
        element: <EverywhereSlideForm />,
      },
      {
        path: "/master/everywhere-slide/edit/:id",
        element: <EverywhereSlideForm />,
      },
      //FAQ'S
      {
        path: "/master/faqs",
        element: <Faqs />,
      },
      {
        path: "/master/faqs/add",
        element: <FaqsForm />,
      },
      {
        path: "/master/faqs/edit/:id",
        element: <FaqsForm />,
      },


    ],
  },

  {
    layout: "auth",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
